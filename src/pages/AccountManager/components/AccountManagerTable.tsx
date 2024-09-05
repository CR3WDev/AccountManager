import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dispatch, SetStateAction, useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import { BillType, IBill } from "../../../types/bills";
import { deleteBill } from "../AccountManagerService";
import { AccountManagerDialog } from "./AccountManagerDialog";
import { transformToBrl } from "@/utils/transformToBrl";

interface AccountManagerTableProps {
  bills: IBill[];
  type: BillType;
  setRefreshKey: Dispatch<SetStateAction<number>>;
}

export const AccountManagerTable = ({
  bills,
  type,
  setRefreshKey,
}: AccountManagerTableProps) => {
  const [rowSelected, setRowSelected] = useState<IBill | undefined>();
  const [showDialog, setShowDialog] = useState<"edit" | "closed" | "add">(
    "closed"
  );

  const handleEdit = (values: IBill) => {
    setRowSelected(values);
    setShowDialog("edit");
  };

  const handleDelete = (values: IBill) => {
    deleteBill(values.id).then(() => {
      setRefreshKey((prev) => prev + 1);
    });
  };

  const textEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const priceEditor = (options: any) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e) => options.editorCallback(e.value)}
        mode="currency"
        currency="BRL"
        locale="pt-BR"
      />
    );
  };

  const priceBodyTemplate = (value: number) => {
    if (!value) return "";
    return transformToBrl(value);
  };

  const typeBodyTemplate = (type: BillType) => {
    if (type === BillType.Essential)
      return <Tag severity="info" value={"Essêncial"} />;
    if (type === BillType.Leisure)
      return <Tag severity="warning" value={"Lazer"} />;
    if (type === BillType.Investment)
      return <Tag value={"Investimento"} severity="success" />;
  };

  return (
    <div>
      <AccountManagerDialog
        setRefreshKey={setRefreshKey}
        setRowSelected={setRowSelected}
        type={type}
        rowSelected={rowSelected}
        isVisible={showDialog}
        setIsVisible={setShowDialog}
      />
      <DataTable
        value={bills}
        editMode="row"
        removableSort
        dataKey="id"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="name"
          header="Nome"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="estimatedValue"
          header="Valor Estimado"
          sortable
          body={(row: IBill) => {
            return priceBodyTemplate(row.estimatedValue) || 0;
          }}
          editor={(options) => priceEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="paidValue"
          header="Valor Pago"
          sortable
          body={(row: IBill) => {
            return priceBodyTemplate(row.paidValue) || 0;
          }}
          editor={(options) => priceEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="type"
          header="Tipo"
          sortable
          body={(row: IBill) => {
            return typeBodyTemplate(row.type);
          }}
          editor={(options) => priceEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          header="Ações"
          body={(row) => {
            return (
              <div className="flex">
                <Button
                  outlined
                  severity="info"
                  className="mr-2"
                  onClick={() => {
                    handleEdit(row);
                  }}
                >
                  <MdEdit size="20" className="mr-2" /> Editar
                </Button>
                <Button
                  outlined
                  severity="danger"
                  onClick={() => {
                    handleDelete(row);
                  }}
                >
                  <MdClose size="20" className="mr-2" /> Remover
                </Button>
              </div>
            );
          }}
          headerStyle={{ width: "10%", minWidth: "8rem" }}
        ></Column>
      </DataTable>
    </div>
  );
};
