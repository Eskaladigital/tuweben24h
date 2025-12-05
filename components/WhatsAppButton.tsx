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

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: '#25D366',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.15, boxShadow: "0 10px 30px rgba(37, 211, 102, 0.4)" }}
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
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
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
              width="42"
              height="42"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.5 0C8.73 0 0 8.73 0 19.5c0 3.45 0.9 6.69 2.46 9.51L0.855 36.45l7.65-2.01c2.7 1.47 5.79 2.31 9.075 2.31h.015C30.27 36.75 39 28.02 39 17.25c0-5.22-2.04-10.125-5.73-13.815C29.58 0 24.69 0 19.5 0zm0 3.51c4.29 0 8.325 1.665 11.37 4.71 3.045 3.045 4.71 7.08 4.71 11.37 0 8.85-7.2 16.065-16.05 16.065-2.64 0-5.25-.645-7.545-1.875l-.54-.285-5.58 1.47 1.485-5.43-.315-.555c-1.35-2.4-2.055-5.13-2.055-7.92 0-8.835 7.2-16.05 16.05-16.05zm-5.85 13.125c-.24-.54-.495-.555-.72-.555-.195 0-.405-.015-.63-.015-.225 0-.585.09-.885.435-.3.33-1.14 1.11-1.14 2.715 0 1.59 1.17 3.135 1.335 3.36.165.225 2.325 3.54 5.625 4.965.78.345 1.395.54 1.875.69.78.24 1.485.21 2.04.135.63-.09 1.92-.78 2.19-1.53.27-.75.27-1.395.195-1.53-.075-.135-.285-.225-.615-.375-.315-.15-1.875-.93-2.175-1.035-.3-.105-.51-.15-.72.15-.21.3-.81.99-1.005 1.2-.195.21-.375.225-.69.075-.315-.15-1.32-.495-2.52-1.56-.93-.825-1.56-1.86-1.74-2.175-.18-.315-.015-.48.135-.645.135-.135.315-.36.465-.54.15-.18.195-.3.3-.51.105-.21.045-.39-.03-.54-.075-.15-.72-1.725-.99-2.37z"
                fill="white"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}


