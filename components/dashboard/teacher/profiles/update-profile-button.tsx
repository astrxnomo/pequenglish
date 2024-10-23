import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import UpdateProfileForm from './update-profile-form'
import { Badge } from '@/components/ui/badge'

export default function UpdateProfileButton ({ profileId }: { profileId: string }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <Badge>
          Editar
        </Badge>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Editar perfil</DrawerTitle>
          </DrawerHeader>

          <UpdateProfileForm profileId={profileId} />

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
