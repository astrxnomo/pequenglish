import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import CreateUserForm from '@/components/auth/create-user-form'
import { Plus } from 'lucide-react'

export default function CreateUserButton () {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <Plus/>
          Crear usuario
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Crear nuevo usuario</DrawerTitle>
          </DrawerHeader>

            <CreateUserForm />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
