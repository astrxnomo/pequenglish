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
                ¡Ayuda a tus hijos a aprender inglés con
                <span className="text-teal-600"> clases privadas</span>!
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Una plataforma educativa diseñada para que los niños aprendan inglés a través de clases privadas con profesores calificados. ¡Haz que el aprendizaje sea efectivo y personalizado!
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
            ¿Por qué elegir Pequenglish para tus hijos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center space-y-4 p-6 bg-teal-50 rounded-lg">
              <PlayCircle className="w-12 h-12 text-teal-500" />
              <h3 className="text-xl font-bold text-teal-700">Clases Personalizadas</h3>
              <p className="text-center text-gray-600">Tus hijos recibirán atención individualizada para maximizar su aprendizaje</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-teal-100 rounded-lg">
              <Music className="w-12 h-12 text-teal-600" />
              <h3 className="text-xl font-bold text-teal-700">Profesores Calificados</h3>
              <p className="text-center text-gray-600">Instructores expertos que harán que el aprendizaje sea efectivo y divertido</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-teal-50 rounded-lg">
              <BookOpen className="w-12 h-12 text-teal-500" />
              <h3 className="text-xl font-bold text-teal-700">Materiales Interactivos</h3>
              <p className="text-center text-gray-600">Recursos didácticos que mantendrán a tus hijos interesados y motivados</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-teal-100 rounded-lg">
              <Pencil className="w-12 h-12 text-teal-600" />
              <h3 className="text-xl font-bold text-teal-700">Progreso Medible</h3>
              <p className="text-center text-gray-600">Seguimiento del avance de tus hijos para asegurar resultados óptimos</p>
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
                Miles de niños ya están aprendiendo inglés de forma efectiva con Pequenglish. ¡Dales a tus hijos la ventaja de aprender un nuevo idioma con clases privadas!
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
