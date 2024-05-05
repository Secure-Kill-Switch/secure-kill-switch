// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_autostart::MacosLauncher;
use tauri::Manager;
use tauri::{ SystemTray, SystemTrayEvent };
use system_shutdown::shutdown;


#[tauri::command]
fn shutdown_system() {
  match shutdown() {
      Ok(_) => println!("Shutting down, bye!"),
      Err(error) => eprintln!("Failed to shut down: {}", error),
  }
}

fn open_and_focus_window(app: &tauri::AppHandle) {
  let window = app.get_window("sks-main").unwrap();
  window.show().unwrap();
  window.set_focus().unwrap();
}

fn main() {
  let _fix_unix_paths = fix_path_env::fix();
  let sks_system_tray = SystemTray::new();
  tauri::Builder::default().setup(|app| {
    app.set_activation_policy(tauri::ActivationPolicy::Accessory);
    Ok(())
  })
    .on_window_event(|event| match event.event() {
      tauri::WindowEvent::CloseRequested { api, .. } => {
        event.window().hide().unwrap();
        api.prevent_close();
      }
      _ => {}
    })
    .system_tray(sks_system_tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::LeftClick {
        position: _,
        size: _,
        ..
      } => {
        open_and_focus_window(app);
      }
      SystemTrayEvent::RightClick {
        position: _,
        size: _,
        ..
      } => {
        open_and_focus_window(app);
      }
      SystemTrayEvent::DoubleClick {
        position: _,
        size: _,
        ..
      } => {
        open_and_focus_window(app);
      }
      _ => {}
    })
    .plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec![""])))
    .plugin(tauri_plugin_store::Builder::default().build())
    .invoke_handler(tauri::generate_handler![shutdown_system])
    .run(tauri::generate_context!())
    .expect("SKS failed to run.");
}