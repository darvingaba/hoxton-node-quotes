import  express, { text }  from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app= express()
const db = Database('./db/data.db', {verbose:console.log})

app.use(cors())
app.use(express.json())

const port = 3003

const getQuotes=db.prepare(`
SELECT * FROM quotes;
`)
const getQuoteById=db.prepare(`
SELECT * FROM quotes WHERE id=@id;
`)

const createQuote = db.prepare(`
 INSERT INTO quotes
 (text,firstName,lastName,age,image)
  VALUES
  (@text,@firstName,@lastName,@age,@image);
`);

const updateQuote = db.prepare(`
 UPDATE quotes
 SET text= @text, firstName=@firstName, lastName = @lastName, age=@age, image=@image
 WHERE id=@id
`);

const deleteQuote=db.prepare(`
DELETE FROM quotes WHERE id=@id;
`)

app.get('/quotes',(req,res)=>{
  const quotes=getQuotes.all()
  res.send(quotes)
})

app.get('/quotes/:id',(req,res)=>{
    const quote = getQuoteById.get(req.params)

    if(quote){
        res.send(quote)
    }else{
        res.status(404).send({error : "Quote not found."})
    }
})

app.post('/quotes',(req,res)=>{

    const text = req.body.text;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const image = req.body.image;


    let errors: string[] = [];
    if (typeof text !== "string") {
      errors.push("Text not given or not a string.");
    }

    if (typeof firstName !== "string") {
      errors.push("Name not given or not a string.");
    }

    if (typeof lastName !== "string") {
      errors.push("Last name not given or not a string.");
    }
    if (typeof age !== "string") {
      errors.push("Age not given or not a string.");
    }
    if (typeof image !== "string") {
      errors.push("Image url not given or not a string.");
    }
    if(errors.length>0){
        res.status(404).send({errors})
    }else{
       const givenInfo = createQuote.run(req.body);
       const newQuote = getQuoteById.get({ id: givenInfo.lastInsertRowid });
       res.send(newQuote);
    }
    
})

app.patch('/quotes/:id',(req,res)=>{
    const quote = getQuoteById.get(req.params)
    const updatedQuote= {...quote,...req.body}
    const updated = updateQuote.run(updatedQuote);
    res.send(updated)
})

app.delete('/quotes/:id',(req,res)=>{
    const deletedQuote=deleteQuote.run(req.params)
    res.send(deleteQuote)
})

app.listen(port,()=>console.log(`Server up`))