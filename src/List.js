import React from "react";

import uid from "uid";

export default function List({data, handleEdit, handleDelete}) {
    return (

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    BOOK
                </p>
                <button class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </header>
            <div class="card-content">
                {
                    data.map((book)=>{
                        return(
                            <div class="content">
                                <p>{book.id}</p>
                                <p className="has-text-weight-bold">ISBN : {book.ISBN}</p>
                                <p className="is-underlined"> Title : {book.Title}</p>
                                <p className="is-italic"> Author: {book.Author} </p>
                        
                                <p> Pubish_Date : <time datetime="2016-1-1">{book.Publish_Date}</time></p>
                                <p> Publisher : {book.Publisher}</p>
                                <p> Number : {book.Number}</p>
                                <p className="is-size-6"> Description : {book.Description}</p>
                                <p>URL : <a href="#">{book.URL}</a></p>
                                <p> Create_Date : <time datetime="2015-1-1">{book.Create_Date}</time></p>
                                <p> Last_Up_Date : <time datetime="2015-12-25">{book.Last_Up_Date}</time></p>
                                
                                
                            </div>
                        )
                    })
                }
                
            </div>
            <footer class="card-footer">
                <button href="#" >Save</button>
                <button href="#" onClick={()=>handleEdit(book.id)} >Edit</button>
                <button href="#" onClick={()=>handleDelete(book.id)}>Delete</button>
            </footer>
        </div>
    );
}
