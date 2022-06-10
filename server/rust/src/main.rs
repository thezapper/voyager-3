#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]

//use std::{process, time::Duration};
//use log::{debug, error, log_enabled, info, Level};
use actix_web::{middleware::Logger, App, HttpServer};
use actix_files as axf;

type Counter = u8;

fn main() //-> std::io::Result<()>
{
    
    println!("Print fibonacci numbers");
    
    // generate fibonacchi numbers
    let mut a = 1;
    let mut b = 2;
    
    println!("Start values {} and {}", a, b);
    let mut i: Counter = 1;
    while i <= 11
    {
        let new = a + b;
        a = b;
        b = new;

        print!("{}, ", new);

        i += 1;
    }

    let _p = 4.0;
    i = 0;
    println!();
    println!("Random test");
    
    while i <= 15
    {
        let num: u16 = rand::random();
        print!("{}= {}, ", i, num);
        
        i += 1;
    }

    println!();
    
   // let mut s = "Hello, World!"; //: String = String::from("Hello World!");

    let myNum = 42;
    println!("num: {}", myNum);
   // let n2 = myPrint(myNum);
    println!("num: {}", myNum);
    //connectToMqtt();

    let mut st = String::from("hello");  // s comes into scope

    editString(&mut st);
    println!("{}", st);
    
    printStringChars(&st);
    
    // ------------------------------------
    
    let path = std::env::current_dir().unwrap();
    //let strPath = path.display();
    println!("Dir = {}", path.display());

    let myTup = (1, 1.1, 2.2);
    println!("tup = {}", myTup.0);

    let p1 = MyPoint {x:123, y:456};
    let p2 = MyPoint {x:123.0, y:456};

    let res = runServer();

}

struct MyPoint<T, T2>
{
    x:T,
    y:T2,
}

mod myWeb;

#[actix_web::main]
async fn runServer() -> std::io::Result<()> 
{
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    HttpServer::new(|| {
        App::new()
        .service(axf::Files::new("/public", "../../client/public").show_files_listing())
        .service(myWeb::hello)
        .service(myWeb::echo)
        .service(axf::Files::new("/", "../../client/public").index_file("index.html"))
            .wrap(Logger::default())
            //.route("/hey", myWeb::get().to(myWeb::manual_hello))
    })
    .bind(("127.0.0.1", 3003))?
    .run()
    .await
}

fn printStringChars(some_string: &str)
{ 
    let chars = some_string.as_bytes();

    for (i, &item) in chars.iter().enumerate()
    {
        println!("{} > {}", i, item as char);
    }

    for &item in chars.iter()
    {
        println!("> {}", item as char);
    }
}

fn editString(some_string: &mut String)
{ 
    some_string.push_str(", World");
    println!("to> {}", some_string);

    //some_string
}

//fn myPrint(mut myStr: &str) 
fn myPrint(myStr: i32) -> i32
{
    //let _myStr = ("mod:" + myStr);
    let n: i32 = myStr + 2;
    println!("> {}", n);

    n
}