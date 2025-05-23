"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Program } from "@/store/api/apiSlice" // Import your Vuz interface
import { Button } from '@/components/registry/new-york-v4/ui/button';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/registry/new-york-v4/ui/dropdown-menu"
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/registry/new-york-v4/ui/alert-dialog"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// --- Helper component for Delete Confirmation ---
const DeleteVuzAction = ({ vuzId, vuzName }: { vuzId: string, vuzName: string }) => {
    // const [deleteVuz, { isLoading }] = useDeleteVuzMutation();
    // const { toast } = useToast();

    const handleDelete = async () => {
        // try {
        //     await deleteVuz(vuzId).unwrap();
        //     toast({
        //         title: "Успех!",
        //         description: `ВУЗ "${vuzName}" успешно удален.`,
        //     });
        // } catch (err) {
        //      console.error("Failed to delete VUZ:", err);
        //      toast({
        //          title: "Ошибка!",
        //          description: `Не удалось удалить ВУЗ "${vuzName}".`,
        //          variant: "destructive",
        //      });
        // }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="w-full h-8 p-0 justify-start text-red-600 hover:text-red-700 px-2">
                   <Trash2 className="mr-2 h-4 w-4" /> Удалить
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие необратимо. Образовательная программа "{vuzName}" будут удалены навсегда.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        {/* {isLoading ? "Удаление..." : "Удалить"} */}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


export const columns: ColumnDef<Program>[] = [
  {
    accessorKey: "name_ru",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Название (RU)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name_ru")}</div>,
  },
  {
    accessorKey: "level",
    header: "Уровень",
  },
  {
    accessorKey: "code",
    header: "Код",
  },
   {
    accessorKey: "accreditation_expiry_date",
    header: "Срок аккредитации до",
     cell: ({ row }) => {
        const date = row.getValue("accreditation_expiry_date") as string;
        // Optional: Format date nicely
        return date ? new Date(date).toLocaleDateString('ru-RU') : 'N/A';
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const progtram = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
             <Link href={`/admin/program/${progtram.id}`} passHref legacyBehavior>
                 <DropdownMenuItem asChild className="cursor-pointer">
                     <a><Pencil className="mr-2 h-4 w-4" /> Редактировать</a>
                 </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
             {/* Integrate Delete Confirmation */}
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <DeleteVuzAction vuzId={progtram.id} vuzName={progtram.name_ru} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]