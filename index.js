const express = require('express')
const app = express()
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('PDF Generator')
})

app.post('/pdf', (req, res) => {
    const data = (req.body.htmlString);

    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = data;
    //htmlObject.getElementById("myDiv").style.marginTop = something;

    var doc = new jsPDF();          
    var elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true;
      }
    };

    var elementHTML = htmlObject.querySelector("#myDiv");
    var tempValue;

    doc.html(elementHTML, {
        callback: function(doc) {
            // Save the PDF
            tempValue = doc.save('sample-document.pdf');
        },
        x: 15,
        y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });


    res.send(tempValue)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`)
})