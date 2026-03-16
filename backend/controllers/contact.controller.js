export const contactController = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Por favor, completa los campos requeridos (nombre, email y mensaje).' 
      });
    }

    // Typical integration here: SendGrid, Nodemailer, etc.
    // We mock the successful delay to simulate an email sent.
    console.log(`[CONTACT RECEIVED]
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service: ${service}
      Message: ${message}
    `);

    return res.status(200).json({
      status: 'success',
      message: '¡Gracias por contactar! He recibido tu mensaje y me pondré en contacto contigo muy pronto para agendar tu cita.'
    });

  } catch (error) {
    console.error('Error in contact controller:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Ha ocurrido un error interno al procesar tu solicitud.'
    });
  }
};
