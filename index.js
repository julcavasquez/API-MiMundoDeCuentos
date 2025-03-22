const express = require('express');
const estudiantesRoutes = require('./routes/estudiantesRoutes.js');
const OpenAI = require('openai'); // ¡Cambió la forma de importar!
const cors = require('cors');
require('dotenv').config();
console.log(process.env.OPENAI_API_KEY);
const app = express();
app.use(express.json());
app.use(cors());

console.log(process.env.OPENAI_API_KEY);


// Configuración OpenAI con nueva sintaxis
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


// Ruta para generar cuento
app.post('/api/cuento', async (req, res) => {
    const { nombre, tema, personajes } = req.body;
  
    const prompt = `Crea un cuento corto para niños protagonizado por ${nombre}, sobre ${tema}, incluyendo personajes como ${personajes}. El cuento debe ser alegre y educativo.`;
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4.5-preview',
        messages: [{ role: 'user', content: prompt }],
      });
  
      res.json({ cuento: completion.choices[0].message.content });
    } catch (error) {
      console.error("Error detallado:", error);
      res.status(500).json({ error: 'Error generando el cuento', detalle: error.message });
    }
  });

app.get('/',(req, res) => {
    res.send('Hola Mundo');
});

app.use("/estudiantes",estudiantesRoutes);


app.listen(3000,() => {
    console.log('Servidor activo');
});

