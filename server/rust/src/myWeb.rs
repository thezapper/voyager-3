use actix_web::{get, post, HttpResponse, Responder };
//use core::result::Result;

#[get("/hello")]
pub async fn hello() -> impl Responder 
{
    
    HttpResponse::Ok().body("Hello from Rust webserver!")
}

// #[get("/")]
// pub async fn index() -> impl Responder 
// {
//      // response
//      HttpResponse::build((StatusCode::OK)
//      .content_type(ContentType::plaintext())
//      .body(include_str!("../static/index.html")))

// }

#[post("/echo")]
pub async fn echo(req_body: String) -> impl Responder 
{
    HttpResponse::Ok().body(req_body)
}

pub async fn manual_hello() -> impl Responder {

    HttpResponse::Ok().body("Hey there!")
}