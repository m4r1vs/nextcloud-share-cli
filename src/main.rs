use log::debug;
use std::env;
use std::error::Error;

const LOG_URL: &str = "https://google.com";

fn main() {
    let args: Vec<String> = env::args().collect();

    for arg in args.iter() {
        println!("{}", arg);
    }

    let result: Result<(), Box<dyn Error>> = http_test();

    match result {
        Ok(v) => debug!("result: {v:?}"),
        Err(e) => println!("error: {e:?}"),
    }
}

fn http_test() -> Result<(), Box<dyn Error>> {
    let resp = reqwest::blocking::put(LOG_URL)?.text()?;
    println!("{:#?}", resp);
    Ok(())
}
