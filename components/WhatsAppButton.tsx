'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const phoneNumber = '34601376559'

  const quickMessages = [
    'Quiero conocer los precios 💰',
    'Necesito una web urgente 🚀',
    '¿Hacéis diseño responsive? 📱',
    'Quiero más información ⚡',
  ]

  const handleQuickMessage = (msg: string) => {
    setCustomMessage(msg)
  }

  const handleSendMessage = () => {
    const finalMessage = customMessage || '¡Hola! Me interesa su servicio'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-28 right-6 z-50 w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#075E54] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">TuWebEn24h</h3>
                  <p className="text-white/80 text-xs">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Area */}
            <div className="bg-[#ECE5DD] p-4 min-h-[320px]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg rounded-tl-none p-3 mb-4 shadow-sm max-w-[85%]"
              >
                <p className="text-gray-800 text-sm mb-1">
                  ¡Hola! 👋 Soy de <strong>TuWebEn24h</strong>
                </p>
                <p className="text-gray-800 text-sm mb-1">
                  ¿En qué puedo ayudarte?
                </p>
                <span className="text-xs text-gray-500">Ahora</span>
              </motion.div>

              {/* Quick Message Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2 mb-4"
              >
                <p className="text-xs text-gray-600 mb-2 font-semibold">Respuestas rápidas:</p>
                {quickMessages.map((msg, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => handleQuickMessage(msg)}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md shadow-sm border border-gray-100"
                  >
                    {msg}
                  </motion.button>
                ))}
              </motion.div>

              {/* Custom Message Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-xs text-gray-600 mb-2 font-semibold">O escribe tu mensaje:</p>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 outline-none text-sm text-gray-800 resize-none"
                  rows={3}
                />
              </motion.div>
            </div>

            {/* Footer with Send Button */}
            <div className="bg-white p-4 border-t border-gray-200">
              <button
                onClick={handleSendMessage}
                disabled={!customMessage}
                className={`block w-full py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  customMessage
                    ? 'bg-[#25D366] hover:bg-[#20ba5a] text-white cursor-pointer shadow-md hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Enviar mensaje por WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - Diseño sencillo blanco y negro */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chat de WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-black"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="whatsapp"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}










