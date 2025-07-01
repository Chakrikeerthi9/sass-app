import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import { Companion } from "@/types";
import Image from "next/image";
import Link from "next/link";
  
interface CompanionListProps {
    title: string;
    companions?: Companion[];
    className?: string;
}

const CompanionList = ({ title, companions, className }: CompanionListProps) => {
  return (
    <article className={cn('companion-list', className)}>
            <h2 className="text-3xl font-bold">{title}</h2>

        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="text-lg w-2/3">Lessons</TableHead>
                <TableHead className="text-lg">Subjects</TableHead>
                <TableHead className="text-lg text-right">Duration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    companions?.map(({id, name, subject, duration, topic})=>(
                        <TableRow key={id}>
                            <TableCell>
                                <Link href={`/companinons/${id}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                                            style={{backgroundColor: getSubjectColor(subject)}}
                                        >
                                            <Image 
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold text-2xl">
                                            {name}
                                        </p>
                                        <p className="text-lg">
                                            {topic}
                                        </p>
                                    </div>

                                </Link>

                            </TableCell>
                                <TableCell>
                                    <div className="subject-badge w-fit">
                                        {subject}
                                    </div>
                                    <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{background: getSubjectColor(subject)}}>
                                        <Image
                                            src={`/icons/${subject}.svg`}
                                            alt={subject}
                                            width={18} 
                                            height={18}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 w-full justify-end">
                                        <p className="text-2xl">
                                            {duration} {' '}
                                            <span className="max-md:hidden">mins</span>
                                        </p>
                                        <Image
                                            src='/icons/clock.svg'
                                            alt='minutes'
                                            width={14}
                                            height={14}
                                        />
                                    </div>
                                </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            </Table>

    </article>
  )
}

export default CompanionList