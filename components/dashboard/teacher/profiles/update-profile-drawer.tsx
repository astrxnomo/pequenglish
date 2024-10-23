import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import UpdateProfileForm from './update-profile-form'
import { Badge } from '@/components/ui/badge'
import { type Profile } from '@/types/custom'

export default function UpdateProfileDrawer ({ profile }: { profile: Profile }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Badge>
          Editar
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm my-10">
          <DrawerHeader>
            <DrawerTitle>Editar perfil</DrawerTitle>
          </DrawerHeader>

          <UpdateProfileForm profile={profile} />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
