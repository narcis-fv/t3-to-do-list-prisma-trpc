import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import { api } from "~/utils/api";
import { type ShoppingItem } from "@prisma/client";

type ItemModalProps = {
  onClose: () => void;
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>;
};

export const ItemModal: FC<ItemModalProps> = ({ onClose, setItems }) => {
  const [itemName, setItemName] = useState<string>("");

  const addItem = api.items.addItem.useMutation();
  const handleAddItem = () => {
    addItem.mutate(
      {
        name: itemName,
      },
      {
        onSuccess: (item) => {
          console.log("success adding item");
          setItems((items) => [...items, item]);
          onClose();
        },
      }
    );
  };

  return (
    <div
      className={
        "absolute inset-0 flex items-center justify-center bg-black/75"
      }
    >
      {/*//add a form with a name input, an add button and a cancel button*/}
      <form
        className={"flex flex-col items-center space-y-4 rounded bg-white p-3"}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddItem();
        }}
      >
        <label htmlFor={"name"} className={"text-lg font-semibold"}>
          Name
        </label>
        <input
          type={"text"}
          id={"name"}
          name={"name"}
          className={"rounded bg-gray-100 p-2"}
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
        <div className={"flex w-full justify-between"}>
          <button
            type={"button"}
            className={"rounded bg-red-500 p-2 text-white"}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type={"submit"}
            className={"ml-2 rounded bg-green-500 p-2 text-white"}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
