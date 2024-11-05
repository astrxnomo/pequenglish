import { Button } from '@/components/ui/button'
import { BookOpen, Music, Pencil, PlayCircle } from 'lucide-react'
import Link from 'next/link'

export default function Index () {
  return (
    <>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  ¡Aprende inglés
                  <span className="text-teal-600"> jugando</span>!
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Una plataforma divertida e interactiva para que los niños aprendan inglés con juegos, canciones y ejercicios.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="lg" asChild>
                  <Link href="/register">¡Comienza gratis!</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-teal-600 border-teal-500 hover:bg-teal-50" asChild>
                  <Link href="/demo">Ver demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 text-teal-700">
              ¿Por qué elegir Pequenglish?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-50 rounded-lg">
                <PlayCircle className="w-12 h-12 text-teal-500" />
                <h3 className="text-xl font-bold text-teal-700">Juegos Educativos</h3>
                <p className="text-center text-gray-600">Aprende mientras te diviertes con juegos interactivos</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-100 rounded-lg">
                <Music className="w-12 h-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-700">Canciones</h3>
                <p className="text-center text-gray-600">Melodías pegajosas para memorizar nuevo vocabulario</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-50 rounded-lg">
                <BookOpen className="w-12 h-12 text-teal-500" />
                <h3 className="text-xl font-bold text-teal-700">Historias</h3>
                <p className="text-center text-gray-600">Cuentos interactivos para mejorar la comprensión</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-teal-100 rounded-lg">
                <Pencil className="w-12 h-12 text-teal-600" />
                <h3 className="text-xl font-bold text-teal-700">Ejercicios</h3>
                <p className="text-center text-gray-600">Actividades prácticas para reforzar el aprendizaje</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-100 to-teal-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-teal-800">
                  ¡Únete a nuestra comunidad de pequeños aprendices!
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                  Miles de niños ya están aprendiendo inglés de forma divertida con Pequenglish
                </p>
              </div>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="lg" asChild>
                <Link href="/register">¡Pruébalo!</Link>
              </Button>
            </div>
          </div>
        </section>
    </>
  )
}
