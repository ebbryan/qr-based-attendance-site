"use client";

import { TExtendedQRProfile } from "@/schemas/students.schema";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const TableComponent = ({ data }: { data: TExtendedQRProfile[] }) => {
  const router = useRouter();
  const onRowClick = (id: string | undefined) => {
    router.push(`/qr-registration/${id}`);
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Grade Level</TableHead>
            <TableHead className="w-[100px]">Strand</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right w-[500px]">QR Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id} onClick={() => onRowClick(item.id)}>
                <TableCell className="font-medium">
                  {item.student_id.grade_level_id.grade_level_number}
                </TableCell>
                <TableCell>{item.student_id.strand_id.strand_name}</TableCell>
                <TableCell>
                  {item.student_id.last_name}, {item.student_id.first_name}{" "}
                  {item.student_id.middle_name
                    ? item.student_id.middle_name
                    : ""}
                </TableCell>
                <TableCell className="text-right">{item.qr_code}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TableComponent;
