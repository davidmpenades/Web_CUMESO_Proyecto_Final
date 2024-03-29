import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  Checkbox,
  OutlinedInput,
  ListItemText,
  Button,
  Chip,
} from "@mui/material";
import usePart from "../../../hooks/usePart";
import useProviders from "../../../hooks/useProvider";
import useMachines from "../../../hooks/useMachine";
import MachineService from "../../../services/MachineService";
import ProviderService from "../../../services/ProviderService";
import { toast } from "sonner";
import ConfirmationModal from "../Modals/ConfirmationModal";

const getStatusStyle = (status) => {
  switch (status) {
    case "Presupuesto enviado":
      return { backgroundColor: "#F6ED97", color: "#000" };
    case "Presupuesto recibido":
      return { backgroundColor: "#F6D597", color: "#000" };
    case "Fabricando":
      return { backgroundColor: "#97ABF6", color: "#000" };
    case "Fabricado":
      return { backgroundColor: "#B2F697", color: "#000" };
    default:
      return {};
  }
};

const PartList = ({ part, onShowUpdateForm }) => {
  const { deletePart } = usePart();
  const { machines, setMachines } = useMachines();
  const { providers } = useProviders();
  const [modalOpen, setModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMachineSlugs, setSelectedMachineSlugs] = useState([]);
  const [selectedProviderSlugs, setSelectedProviderSlugs] = useState([]);
  const imageName = part.img?.split("/").pop() ?? "";
  const cad = part.cad_file?.split("/").pop() ?? "";
  const pdf = part.pdf_file?.split("/").pop() ?? "";
  const rowStyle = getStatusStyle(part.status);

  useEffect(() => {
    const machineSlugsWithPart = machines
      .filter((machine) => machine.parts.includes(part.id))
      .map((machine) => machine.slug);
    setSelectedMachineSlugs(machineSlugsWithPart);

    const providerSlugsWithPart = providers
      .filter((provider) => provider.parts.includes(part.id))
      .map((provider) => provider.slug);
    setSelectedProviderSlugs(providerSlugsWithPart);
  }, [machines, providers, part.id, part.machines, part.providers]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const isMachineAssociatedWithPart = (machineSlug) => {
    return machines.some(
      (machine) =>
        machine.slug === machineSlug && machine.parts.includes(part.id)
    );
  };

  const isProviderAssociatedWithPart = (providerSlug) => {
    return providers.some(
      (provider) =>
        provider.slug === providerSlug && provider.parts.includes(part.id)
    );
  };

  const handleMachineChange = async (event) => {
    const selectedSlugs = event.target.value;
    setSelectedMachineSlugs(selectedSlugs);
  
    const machineUpdates = machines
      .map((machine) => {
        if (selectedSlugs.includes(machine.slug)) {
          if (!machine.parts.includes(part.id)) {
            return { slug: machine.slug, parts: [...machine.parts, part.id] };
          }
        } else {
          if (machine.parts.includes(part.id)) {
            return {
              slug: machine.slug,
              parts: machine.parts.filter((id) => id !== part.id),
            };
          }
        }
        return null;
      })
      .filter(Boolean);
  
    try {
      await Promise.all(
        machineUpdates.map((update) =>
          MachineService.addPartToMachine(update.slug, {
            parts: update.parts,
          })
        )
      );
      toast.success("Máquinas actualizadas correctamente para la pieza.");
    } catch (error) {
      console.error("Error al actualizar máquinas para la pieza:", error);
      toast.error("Error al actualizar máquinas para la pieza.");
    }
  };
  

  const handleProviderChange = async (event) => {
    const selectedSlugs = event.target.value;
    setSelectedProviderSlugs(selectedSlugs);

    const providerUpdates = providers
      .map((provider) => {
        if (selectedSlugs.includes(provider.slug)) {
          if (!provider.parts.includes(part.id)) {
            return { slug: provider.slug, parts: [...provider.parts, part.id] };
          }
        } else {
          if (provider.parts.includes(part.id)) {
            return {
              slug: provider.slug,
              parts: provider.parts.filter((id) => id !== part.id),
            };
          }
        }
        return null;
      })
      .filter(Boolean);

    try {
      await Promise.all(
        providerUpdates.map((update) =>
          ProviderService.addPartToProvider(update.slug, {
            parts: update.parts,
          })
        )
      );
      toast.success("Proveedores actualizados correctamente para la pieza.");
    } catch (error) {
      toast.error("Error al actualizar proveedores para la pieza.");
    }
  };

  const handleDeleteClick = async () => {
    deletePart(part.slug);
    setModalOpen(false);
    toast.success("Pieza eliminada correctamente.");
  };

  return (
    <tr style={rowStyle}>
      <td className="w-1/4 min-w-[120px] max-w-[160px] px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div className="inline-flex items-center gap-x-3">
          <input
            type="checkbox"
            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
          />
          <h2 className="font-normal text-gray-800 dark:text-white ">
            {part.name}
          </h2>
        </div>
      </td>
      <td className="px-12 py-4 text-sm text-center font-normal text-black whitespace-nowrap">
        {part.description}
      </td>
      <td className="hidden sm:table-cell w-1/12 px-4 py-4 text-sm text-black text-center dark:text-gray-300">
        {part.quantity}
      </td>
      <td className="px-4 py-4 text-sm text-black text-center dark:text-gray-300">
        {part.status}
      </td>
      <td className="hidden sm:table-cell w-32">
        <Select
          multiple
          value={machines
            .filter((machine) => isMachineAssociatedWithPart(machine.slug))
            .map((machine) => machine.slug)}
          onChange={handleMachineChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selected.map((slug) => (
                <Chip
                  key={slug}
                  label={
                    machines.find((machine) => machine.slug === slug)?.name ||
                    slug
                  }
                />
              ))}
            </div>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "200px",
                backgroundColor: "white", 
              },
            },
          }}
        >
          {machines.map((machine) => (
            <MenuItem key={machine.slug} value={machine.slug}>
              <Checkbox checked={selectedMachineSlugs.includes(machine.slug)} />
              <ListItemText primary={machine.name} />
            </MenuItem>
          ))}
        </Select>
      </td>
      <td className="hidden sm:table-cell w-32">
        <Select
          multiple
          value={providers
            .filter((provider) => isProviderAssociatedWithPart(provider.slug))
            .map((provider) => provider.slug)}
          onChange={handleProviderChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selected.map((slug) => (
                <Chip
                  key={slug}
                  label={
                    providers.find((provider) => provider.slug === slug)
                      ?.name || slug
                  }
                />
              ))}
            </div>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                backgroundColor: "white", 
              },
            },
          }}
        >
          {providers.map((provider) => (
            <MenuItem key={provider.slug} value={provider.slug}>
              <Checkbox
                checked={selectedProviderSlugs.includes(provider.slug)}
              />
              <ListItemText primary={provider.name} />
            </MenuItem>
          ))}
        </Select>
      </td>
      <td className="hidden sm:table-cell w-32 px-4 py-4 text-sm text-black dark:text-gray-300 whitespace-nowrap">
        {new Date(part.updated_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="hidden sm:table-cell w-32 px-4 py-4 text-sm text-black dark:text-gray-300 whitespace-nowrap">
        {new Date(part.created_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-black dark:text-gray-300">
        {imageName ? "Sí" : "No"}
      </td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-black dark:text-gray-300">
        {cad ? "Sí" : "No"}
      </td>
      <td className="hidden sm:table-cell px-4 py-4 text-sm text-center text-black dark:text-gray-300">
        {pdf ? "Sí" : "No"}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <button
          onClick={toggleDropdown}
          className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
        {showDropdown && (
          <div className="relative right-0 z-10 mt-2 w-36 origin-top-left rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
            <div className="py-1" role="none">
              <button
                onClick={() => onShowUpdateForm(part)}
                className="text-gray-700 w-full block px-4 py-2 text-sm hover:bg-blue-300"
              >
                Actualizar
              </button>

              <button
                href="#"
                className="text-gray-700 w-full block px-4 py-2 text-sm hover:bg-green-300"
                role="menuitem"
              >
                Enviar
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="text-gray-700 w-full block px-4 py-2 text-sm hover:bg-red-400"
                role="menuitem"
              >
                Borrar
              </button>
              <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteClick}
                title="Confirmar Borrado"
                description={`¿Estás seguro de que quieres eliminar la pieza "${part.name}"?`}
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default PartList;
