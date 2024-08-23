import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BillType, IBill } from "../../../types/bills";
import { addBill, editBill } from "../AccountManagerService";

interface AccountManagerDialogProps {
  isVisible: "edit" | "closed" | "add";
  setIsVisible: Dispatch<SetStateAction<"edit" | "closed" | "add">>;
  rowSelected: IBill | undefined;
  type: BillType;
  setRowSelected: Dispatch<SetStateAction<IBill | undefined>>;
  setRefreshKey: Dispatch<SetStateAction<number>>;
}
export const AccountManagerDialog = ({
  isVisible,
  setIsVisible,
  rowSelected,
  type,
  setRefreshKey,
  setRowSelected,
}: AccountManagerDialogProps) => {
  const { register, handleSubmit, control, setValue, reset } = useForm();
  const isEditMode = isVisible === "edit";

  const onSubmit = (data: any) => {
    if (isEditMode) {
      if (!rowSelected) return;
      editBill(rowSelected?.id, { ...data, type: type }).then(() => {
        setIsVisible("closed");
        setRefreshKey((prev) => prev + 1);
      });
    } else {
      addBill({ ...data, type: type }).then(() => {
        setIsVisible("closed");
        setRefreshKey((prev) => prev + 1);
      });
    }
  };

  useEffect(() => {
    if (isVisible === "add") {
      setRowSelected(undefined);
      reset();
      return;
    }
    if (isVisible === "closed") {
      setRowSelected(undefined);
      reset();
      return;
    }

    if (!isEditMode) return;
    if (!rowSelected) return;

    if (isEditMode) {
      setValue("name", rowSelected?.name);
      setValue("estimatedValue", rowSelected?.estimatedValue);
      setValue("paidValue", rowSelected?.paidValue);
      return;
    }
  }, [isVisible]);

  return (
    <Dialog
      visible={isVisible === "edit" || isVisible === "add"}
      header={isEditMode ? "Editar Conta" : "Adicionar Conta"}
      draggable={false}
      onHide={() => {
        setIsVisible("closed");
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column">
          <label className="font-bold mb-1">Nome</label>
          <InputText
            placeholder="Nome"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div className="flex flex-column">
          <label className="font-bold mb-1">Valor Estimado</label>
          <Controller
            control={control}
            name="estimatedValue"
            render={({ field }) => {
              return (
                <InputText
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Valor Estimado"
                />
              );
            }}
          />
        </div>
        <div className="flex flex-column">
          <label className="font-bold mb-1">Valor Pago</label>
          <Controller
            control={control}
            name="paidValue"
            render={({ field }) => {
              return (
                <InputText
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Valor Pago"
                />
              );
            }}
          />
        </div>
        <div className="flex justify-content-end mt-2">
          <Button label={isEditMode ? "Editar" : "Adicionar"} />
        </div>
      </form>
    </Dialog>
  );
};
