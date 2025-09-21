"use client";

import { useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  //estados
  const [costLiter, setCostLiter] = useState("");
  const [mlUsed, setMlUsed] = useState("");
  const [hourlyLightCost, setHourlyLightCost] = useState("");
  const [hours, setHours] = useState("");
  const [maintenanceCostHours, setMaintenanceCostHours] = useState("");
  const [margin, setMargin] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [resinCostState, setResinCostState] = useState(0);
  const [electricityCostState, setElectricityCostState] = useState(0);
  const [maintenanceCostState, setMaintenanceCostState] = useState(0);

  //calcular
  const calculate = () => {
    //obtener el valor del costo de resina
    const resinCost =
      (parseFloat(costLiter || 0) / 1000) * parseFloat(mlUsed || 0);
    //obtener el valor del costo de luz
    const electricityCost =
      parseFloat(hourlyLightCost || 0) * parseFloat(hours || 0);
    //obtener el valor del mantenimiento
    const maintenanceCost =
      parseFloat(maintenanceCostHours || 0) * parseFloat(hours || 0);

    //obtener el costo total
    const totalCost = resinCost + electricityCost + maintenanceCost;
    //establecer precio final
    const finalPrice = totalCost * (1 + parseFloat(margin || 0) / 100);

    setResinCostState(resinCost.toFixed(2));
    setElectricityCostState(electricityCost.toFixed(2));
    setMaintenanceCostState(maintenanceCost.toFixed(2));

    setTotalCost({
      totalCost: totalCost.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    });

    //  Mostrar en consola
    console.log("Costo resina:", resinCost);
    console.log("Costo electricidad:", electricityCost);
    console.log("Costo mantenimiento:", maintenanceCost);
    console.log("Costo total:", totalCost);
    console.log("Precio final:", finalPrice);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card className="bg-[#f1f1f1]">
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-lime-600">Costo de resina por litro</label>
            <Input
            className="bg-white"
              value={costLiter}
              onChange={(e) => setCostLiter(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-lime-600">Mililitros usados</label>
            <Input  className="bg-white" value={mlUsed} onChange={(e) => setMlUsed(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-lime-600">Costo de electricidad por hora</label>
            <Input
            className="bg-white"
              value={hourlyLightCost}
              onChange={(e) => setHourlyLightCost(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-lime-600">Horas de impresion</label>
            <Input className="bg-white" value={hours} onChange={(e) => setHours(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-lime-600">Costo mantenimiento por hora</label>
            <Input
              className="bg-white"
              value={maintenanceCostHours}
              onChange={(e) => setMaintenanceCostHours(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-lime-600">Margen de ganancia</label>
            <Input className="bg-white" value={margin} onChange={(e) => setMargin(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-evenly">
          <Button onClick={calculate} variant="outline">
            Calcular
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardContent className="text-center">
          <label className="text-sky-800">
            Estimado <label className="text-lime-600"> ${totalCost?.finalPrice ? totalCost.finalPrice : 0}</label> por
            impresion
          </label>
          <div className="mt-7 after:border-border relative after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
          <div className="grid grid-cols-4 pt-5">
            <div className="border-r border-gray-300/50 px-4">
              <label className="flex flex-col pt-5 text-sky-800 ">${resinCostState}</label>
              <label className="flex flex-col pb-5">Resina</label>
            </div>
            <div className="border-r border-gray-300/50 px-4">
              <label className="flex flex-col pt-5 text-sky-800">
                ${electricityCostState}
              </label>
              <label className="flex flex-col pb-5">Electricidad</label>
            </div>
            <div className="border-r border-gray-300/50 px-4">
              <label className="flex flex-col pt-5 text-sky-800">
                ${maintenanceCostState}
              </label>
              <label className="flex flex-col pb-5">Mantenimiento</label>
            </div>
            <div className="px-4">
              <label className="flex flex-col pt-5 text-sky-800">
                ${totalCost?.totalCost ? totalCost.totalCost : 0}
              </label>
              <label className="flex flex-col pb-5">Total</label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
