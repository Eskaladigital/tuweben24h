// Sistema de emails con Resend (https://resend.com)
// Instalar con: npm install resend

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  nombre: string
  email: string
  telefono: string
  empresa: string
  plan: string
}

export async function enviarEmailConfirmacionCliente(data: EmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'TuWebEn24h <noreply@tuweben24h.com>',
      to: data.email,
      subject: '✅ Hemos recibido tu solicitud - TuWebEn24h',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .card {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .button {
                display: inline-block;
                background: #2563eb;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
              }
              .steps {
                list-style: none;
                padding: 0;
              }
              .steps li {
                padding: 10px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .steps li:last-child {
                border-bottom: none;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Solicitud Recibida!</h1>
                <p>Gracias por confiar en TuWebEn24h</p>
              </div>
              
              <div class="content">
                <p>Hola <strong>${data.nombre}</strong>,</p>
                
                <p>Hemos recibido correctamente tu solicitud para crear la web de <strong>${data.empresa}</strong>.</p>
                
                <div class="card">
                  <h2>📋 Resumen de tu solicitud</h2>
                  <p><strong>Plan seleccionado:</strong> ${data.plan}</p>
                  <p><strong>Email:</strong> ${data.email}</p>
                  <p><strong>Teléfono:</strong> ${data.telefono}</p>
                </div>
                
                <div class="card">
                  <h2>⏭️ Próximos pasos</h2>
                  <ol class="steps">
                    <li>✅ <strong>Confirmación recibida</strong> - ¡Ya estás aquí!</li>
                    <li>📞 <strong>Te contactaremos</strong> - En las próximas 2-4 horas</li>
                    <li>💳 <strong>Pago y detalles</strong> - Confirmaremos todo contigo</li>
                    <li>🎨 <strong>Diseño y desarrollo</strong> - Empezamos a trabajar</li>
                    <li>🚀 <strong>Entrega en 24h</strong> - Tu web estará lista</li>
                  </ol>
                </div>
                
                <div style="text-align: center;">
                  <p>¿Tienes alguna pregunta?</p>
                  <a href="mailto:info@tuweben24h.com" class="button">
                    Contáctanos
                  </a>
                </div>
              </div>
              
              <div class="footer">
                <p>TuWebEn24h - Tu web profesional en 24 horas</p>
                <p>
                  <a href="mailto:info@tuweben24h.com">info@tuweben24h.com</a> | 
                  <a href="tel:+34900000000">+34 900 000 000</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando email al cliente:', error)
      return { success: false, error }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error en enviarEmailConfirmacionCliente:', error)
    return { success: false, error }
  }
}

export async function enviarEmailNotificacionAdmin(data: EmailData & { descripcion: string }) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Sistema TuWebEn24h <sistema@tuweben24h.com>',
      to: process.env.ADMIN_EMAIL || 'admin@tuweben24h.com',
      subject: `🔔 Nueva Solicitud: ${data.empresa}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: #1e40af;
                color: white;
                padding: 20px;
                text-align: center;
              }
              .content {
                background: white;
                padding: 20px;
                border: 1px solid #e5e7eb;
              }
              .info-row {
                padding: 10px 0;
                border-bottom: 1px solid #f3f4f6;
              }
              .label {
                font-weight: bold;
                color: #1e40af;
              }
              .button {
                display: inline-block;
                background: #2563eb;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔔 Nueva Solicitud</h1>
                <p>Se ha recibido una nueva solicitud de web</p>
              </div>
              
              <div class="content">
                <h2>Información del Cliente</h2>
                
                <div class="info-row">
                  <span class="label">Nombre:</span> ${data.nombre}
                </div>
                <div class="info-row">
                  <span class="label">Empresa:</span> ${data.empresa}
                </div>
                <div class="info-row">
                  <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
                </div>
                <div class="info-row">
                  <span class="label">Teléfono:</span> <a href="tel:${data.telefono}">${data.telefono}</a>
                </div>
                <div class="info-row">
                  <span class="label">Plan:</span> ${data.plan}
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 6px;">
                  <p class="label">Descripción del proyecto:</p>
                  <p>${data.descripcion}</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://tuweben24h.com/admin" class="button">
                    Ver en Dashboard
                  </a>
                </div>
                
                <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
                  <strong>Acción requerida:</strong> Contacta con el cliente en las próximas 2-4 horas para confirmar los detalles del proyecto.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error enviando email al admin:', error)
      return { success: false, error }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error('Error en enviarEmailNotificacionAdmin:', error)
    return { success: false, error }
  }
}

// Para usar en el API route:
// import { enviarEmailConfirmacionCliente, enviarEmailNotificacionAdmin } from '@/lib/email/templates'
// 
// // Después de guardar en Supabase:
// await enviarEmailConfirmacionCliente(data)
// await enviarEmailNotificacionAdmin(data)
