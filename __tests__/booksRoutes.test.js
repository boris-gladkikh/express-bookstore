process.env.NODE_ENV = "test"; 
const app = require("../app.js");
const db = require("../db.js");
const express = require("express");
const Book = require("../models/book.js"); 
const request = require("supertest");

describe("Book Routes Tests",function() {
  let book1;
  beforeEach(async function() {
    await db.query(`DELETE FROM books`);

    book1 = Book.create(
      {
        isbn: "1111111111",
        amazon_url: "http://a.co/test",
        author: "test1",
        language: "english",
        pages: 400,
        publisher: "Penguin",
        title: "Test1",
        year: 2020
      }
    )

  });

  test("get all books", async function() {
    let response = await request(app)
    .get("/books");
    
    expect(response.statusCode).toBe(200);
    expect(response.body.books).toHaveLength(1);
  });

  
  test("get single book", async function() {
    let response = await request(app)
    .get("/books/1111111111");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      book: {
        isbn: "1111111111",
        amazon_url: "http://a.co/test",
        author: "test1",
        language: "english",
        pages: 400,
        publisher: "Penguin",
        title: "Test1",
        year: 2020
      }
    });
  });

  test("create book",async function(){
    let response = await request(app)
    .post("/books/")
    .send(
      {
        isbn: "2222222222",
        amazon_url: "http://a.co/test2",
        author: "test2",
        language: "english",
        pages: 400,
        publisher: "Penguin",
        title: "Test2",
        year: 2020   
  });

  expect(response.statusCode).toBe(201);
  expect(response.body.book).toEqual({
    isbn: "2222222222",
    amazon_url: "http://a.co/test2",
    author: "test2",
    language: "english",
    pages: 400,
    publisher: "Penguin",
    title: "Test2",
    year: 2020   
});

});

test( "create book validation",async function() {
  let response = await request(app)
    .post("/books")
    .send(
      {
        isbn: "2222222222",
        author: "test2",
        language: "english",
        pages: 400,
        publisher: "Penguin",
        title: "Test2",
        year: 2020   
  });
  
  expect(response.statusCode).toBe(400);
  expect(response.body.error.message[0]).toEqual(
    "instance requires property \"amazon_url\""
  )


})





})
