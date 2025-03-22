const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const estudiantesRoutes = require('./routes/estudiantesRoutes.js');
//const OpenAI = require('openai'); // ¡Cambió la forma de importar!





// // Configuración OpenAI con nueva sintaxis
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });


// // Ruta para generar cuento
// app.post('/api/cuento', async (req, res) => {
//     const { nombre, tema, personajes } = req.body;
  
//     const prompt = `Crea un cuento corto para niños protagonizado por ${nombre}, sobre ${tema}, incluyendo personajes como ${personajes}. El cuento debe ser alegre y educativo.`;
  
//     try {
//       const completion = await openai.chat.completions.create({
//         model: 'gpt-4.5-preview',
//         messages: [{ role: 'user', content: prompt }],
//       });
  
//       res.json({ cuento: completion.choices[0].message.content });
//     } catch (error) {
//       console.error("Error detallado:", error);
//       res.status(500).json({ error: 'Error generando el cuento', detalle: error.message });
//     }
//   });

const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Usa tu API Key
// const genAI = new GoogleGenerativeAI(process.env.TU_API_KEY);

// // El modelo que vas a usar (Gemini 1.5 Pro, por ejemplo)
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// async function run() {
//   try {
//     const result = await model.generateContent("¿Cuál es el departamento de Chiclayo?");
//     const response = await result.response;
//     console.log(response.text());
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// run();

// Configurar Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Endpoint para generar cuentos
app.post("/api/generar-cuento", async (req, res) => {
  const { tema, personajes, tono } = req.body;
  console.log("Datos recibidos:", req.body); // 
  // Prompt dinámico
  const prompt = `Crea un cuento infantil sobre "${tema}", con los personajes: ${personajes}. El tono debe ser ${tono}. Hazlo divertido, educativo y fácil de entender para niños.`;
 
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Aquí la respuesta funciona con .text()
    const cuento = response.text();
    //Para confirmar la estructura, siempre es bueno agregar:
    res.json({ cuento });
  } catch (error) {
    console.error("Error generando cuento:", error);
    res.status(500).json({ error: "Hubo un problema al generar el cuento." });
  }
});



// async function generarCuento(tema, personajes, tono) {
//   const prompt = `Crea un cuento infantil sobre "${tema}", con los personajes: ${personajes}. El tono debe ser ${tono}. Hazlo divertido y educativo.`;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;

//     // Aquí la respuesta funciona con .text()
//     const cuento = response.text();

//     console.log("Cuento generado: \n", cuento);
//     return cuento;
//   } catch (error) {
//     console.error("Error al generar cuento:", error);
//   }
// }

// // Prueba directa
// generarCuento("una aventura en la selva", "un tigre llamado Tigo y un loro llamado Lalo", "divertido y educativo");

app.get('/',(req, res) => {
    res.send('Hola Mundo');
});

app.use("/estudiantes",estudiantesRoutes);


app.listen(3000,() => {
    console.log('Servidor activo');
});

