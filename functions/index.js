const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');


admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOU GMAIL ACCOUNT',
        pass: 'YOU PASS'
    }
});

exports.sendMail = functions.database.ref('PATH').onCreate( (snapshot, context) => {
    const data = snapshot.val();

    tem = data.tem;
    hum = data.hum;
    date = new Date(data.time);
    
    const dest = 'you addressee';
    let title = '';
    let body = '';
    
    if( tem > 18 && tem < 25){
        return 0;
    }

    if( tem < 18){
        title = "Temperatura BAJA del rango permitido."
        body = `<h2 style="text-align: center;"> La temperatura es:<span style="color: #FFFFFF; background-color: #2E64FE;"> Baja </span></h2>
                <h3 style="text-decoration: underline black;"><strong>Información</strong></h3>
                <br>
                <p style="margin:0px"> Fecha: <strong>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</strong></p>
                <p style="margin:0px"> Hora: <strong> ${date.getHours()}:${date.getMinutes()}</strong></p>
                <p style="margin:0px">-------------------------</p>
                <ul>
                    <li>Temperatura: <strong>${tem} °C</strong></li>
                    <li> Humedad: <strong>${hum} %HR</strong></li>
                </ul>
                <p style="margin:0px">-------------------------</p>


                <p style="color:#424242; text-align: center"> Alerta enviada por <strong> ProteinLab - UTEM </strong></p>`;
    }

    if( tem > 25){
        title = "Temperatura ALTA del rango permitido."
        body = `<h2 style="text-align: center;"> La temperatura es:<span style="color: #FFFFFF; background-color: #FA5858; text-align: center"> Alta </span></h2>
                <h3 style="text-decoration: underline black;"><strong>Información</strong></h3>
                <br>
                <p style="margin:0px"> Fecha: <strong>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</strong></p>
                <p style="margin:0px"> Hora: <strong> ${date.getHours()}:${date.getMinutes()}</strong></p>
                <p style="margin:0px">-------------------------</p>
                <ul>
                    <li>Temperatura: <strong>${tem} °C</strong></li>
                    <li> Humedad: <strong>${hum} %HR</strong></li>
                </ul>
                <p style="margin:0px">-------------------------</p>


                <p style="color:#424242; text-align: center"> Alerta enviada por <strong> ProteinLab - UTEM </strong></p>`;
    }

    const mailOptions = {
        from: 'YOU NAME <youAccount@gmail.com>',
        to: dest,
        subject: title,
        html: body
    };

    return transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return res.send(err.toString());
        }
        return res.send('Sended');
    });

});
