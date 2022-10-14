use log::debug;
// use std::env;
use std::error::Error;
use std::fs;
use std::net::SocketAddr;

fn main() {
    let nc_root: String = "https://cloud.mafiasi.de".to_string();
    let webdav_endpoint: String = format!("{}{}", nc_root, "");
    let ocs_endpoint: String = format!("{}{}", nc_root, "");

    println!("{}", ocs_endpoint);

    // let args: Vec<String> = env::args().collect();

    // for arg in args.iter() {
    //     debug!("{}", arg);
    // }

    let result: Result<(), Box<dyn Error>> = http_test(webdav_endpoint);

    match result {
        Ok(v) => debug!("result: {v:?}"),
        Err(e) => debug!("error: {e:?}"),
    }
}

fn read_file_raw(path: String) -> Result<String, Box<dyn Error>> {
    let contents: Result<String, Box<dyn Error>> = fs::read_to_string(path)?.parse()?;
    return contents;
}

fn http_test(url: String) -> Result<(), Box<dyn Error>> {
    let resp: String = reqwest::blocking::get(url)?.text()?;
    debug!("{:#?}", resp);
    Ok(())
}
