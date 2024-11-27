'use client'

import { Button } from '@/components/ui/button'
import { MessageCircleQuestion, Shapes, ShieldCheck, UserSearch } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'

// Componente para los elementos decorativos flotantes
function FloatingElement ({ children, className, delay = 0 }: { children: React.ReactNode, className: string, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Index () {
  return (
    <div className="relative overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="absolute top-28 left-72 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
            <div className="absolute top-28 right-72 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

            <FloatingElement className="absolute top-60 right-[25%]" delay={0.5}>
              <div className="w-20 h-20 rotate-45 bg-gradient-to-br from-teal-200/60 to-emerald-200/40 rounded-lg backdrop-blur-sm" />
            </FloatingElement>

            <FloatingElement className="absolute top-40 left-[25%]" delay={1}>
              <div className="w-16 h-16 rotate-12 bg-gradient-to-br from-teal-200/60 to-emerald-200/40 rounded-lg backdrop-blur-sm" />
            </FloatingElement>
        </motion.div>
      </div>

      <section className="max-w-screen-xl px-6 py-20 mx-auto lg:px-6 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="max-w-xl mx-auto">
            <h1 className="text-5xl font-bold leading-none tracking-tight text-primary-900 dark:text-white md:text-6xl mb-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-teal-600"
              >
                ¡Transforma{' '}
              </motion.span>
              el futuro de tus
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-teal-600"
              >
                {' '}hijos!
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mx-auto max-w-[700px] text-gray-600 md:text-xl mb-6"
            >
              Imagina a tus hijos dominando el inglés con confianza y entusiasmo. Nuestras clases están diseñadas para inspirar y motivar, haciendo del aprendizaje una aventura emocionante. ¡Únete a nosotros y abre las puertas a un futuro brillante para tus pequeños!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Button className='text-xl font-semibold py-8 px-10 transform transition-transform hover:scale-105' asChild>
                <Link href="/login">
                  ¡Quiero saber más!
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white/80 backdrop-blur-sm">
        <div className="container px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter text-center mb-12 text-teal-700"
          >
            ¿Por qué elegir Pequenglish para tus hijos?
          </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-50 rounded-lg shadow-lg">
                <UserSearch className="w-12 h-12 text-teal-500" />
                <h3 className="text-xl font-bold text-teal-700">Atención Individualizada</h3>
                <p className="text-center text-gray-600">Tus hijos recibirán atención individualizada para maximizar su aprendizaje y alcanzar su máximo potencial.</p>
              </div>

              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-100 rounded-lg shadow-lg">
                <MessageCircleQuestion className="w-12 h-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-700">Soporte Constante</h3>
                <p className="text-center text-gray-600">Nuestro equipo está siempre disponible para resolver cualquier duda o problema que puedas tener.</p>
              </div>

              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-50 rounded-lg shadow-lg">
                <Shapes className="w-12 h-12 text-teal-500" />
                <h3 className="text-xl font-bold text-teal-700">Materiales Didácticos</h3>
                <p className="text-center text-gray-600">Recursos didácticos innovadores que mantendrán a tus hijos interesados y motivados en cada lección.</p>
              </div>

              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-100 rounded-lg shadow-lg">
                <ShieldCheck className="w-12 h-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-700">Entorno Seguro</h3>
                <p className="text-center text-gray-600">Proporcionamos un entorno seguro y acogedor para que tus hijos puedan aprender con confianza y tranquilidad.</p>
              </div>
            </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-100 to-teal-200/50">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-teal-800">
              ¡Únete a nuestra comunidad de pequeños aprendices!
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                Nuestros métodos innovadores y personalizados pueden transformar el aprendizaje de tus hijos, haciéndolo divertido y efectivo.
              </p>
            </div>
        </div>
      </section>
    </div>
  )
}
