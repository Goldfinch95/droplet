"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  // Estados de entrada
  const [costLiter, setCostLiter] = useState<number | "">("");
  const [mlUsed, setMlUsed] = useState<number | "">("");
  const [hourlyLightCost, setHourlyLightCost] = useState<number | "">("");
  const [hours, setHours] = useState<number | "">("");
  const [postProcessCost, setPostProcessCost] = useState<number | "">("");
  const [workPackageCost, setWorkPackageCost] = useState<number | "">("");
  const [maintenanceCostHours, setMaintenanceCostHours] = useState<number | "">(
    ""
  );
  const [margin, setMargin] = useState<number | "">("");
  
  // Estados de resultados consolidados
  const [results, setResults] = useState({
    resinCost: 0,
    electricityCost: 0,
    maintenanceCost: 0,
    postProcessCost: 0,
    workPackageCost: 0,
    indirectCosts: 0,
    totalCost: 0,
    finalPrice: 0,
  });

  // Revisar el input, convertir el input a número positivo
  const handleNumberChange =
    (setter: (v: number | "") => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "") {
        setter("");
      } else {
        const parsed = parseFloat(value);
        if (!isNaN(parsed) && parsed >= 0) {
          setter(parsed);
        }
      }
    };

  // Validar si hay al menos un campo con valor
  const hasValidInputs = () => {
    return (
      (costLiter && costLiter > 0) ||
      (mlUsed && mlUsed > 0) ||
      (hourlyLightCost && hourlyLightCost > 0) ||
      (hours && hours > 0) ||
      (postProcessCost && postProcessCost > 0) ||
      (workPackageCost && workPackageCost > 0) ||
      (maintenanceCostHours && maintenanceCostHours > 0)
    );
  };

  // Calcular
  const calculate = () => {
    if (!hasValidInputs()) {
      alert("Por favor, ingresa al menos un valor para calcular.");
      return;
    }

    // Obtención de valores
    // Costos directos
    const resinCost = ((costLiter || 0) / 1000) * (mlUsed || 0);
    const electricityCost = (hourlyLightCost || 0) * (hours || 0);
    const maintenanceCost = (maintenanceCostHours || 0) * (hours || 0);
    
    // Costos indirectos
    const postProcess = postProcessCost || 0;
    const workPackage = workPackageCost || 0;
    const indirectCosts = postProcess + workPackage;

    // Suma de todos los costos
    const totalCost = resinCost + electricityCost + maintenanceCost + indirectCosts;
    
    // Aplicar margen de ganancia
    const finalPrice = totalCost * (1 + (margin || 0) / 100);

    // Actualización de estados consolidada
    setResults({
      resinCost,
      electricityCost,
      maintenanceCost,
      postProcessCost: postProcess,
      workPackageCost: workPackage,
      indirectCosts,
      totalCost,
      finalPrice,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card className="bg-[#f1f1f1]">
        <CardContent className="grid gap-4 md:grid-cols-2 p-6">
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Costo de resina por litro
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              className="bg-white"
              value={costLiter}
              onChange={handleNumberChange(setCostLiter)}
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Resina utilizada (ml)
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              className="bg-white"
              value={mlUsed}
              onChange={handleNumberChange(setMlUsed)}
              placeholder="0.00 ml"
            />
          </div>
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Costo de electricidad por hora
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              className="bg-white"
              value={hourlyLightCost}
              onChange={handleNumberChange(setHourlyLightCost)}
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Horas de impresión
            </label>
            <Input
              type="number"
              min="0"
              step="0.1"
              className="bg-white"
              value={hours}
              onChange={handleNumberChange(setHours)}
              placeholder="0 hs"
            />
          </div>
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Postprocesado
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              className="bg-white"
              value={postProcessCost}
              onChange={handleNumberChange(setPostProcessCost)}
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Valor de trabajo
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              className="bg-white"
              value={workPackageCost}
              onChange={handleNumberChange(setWorkPackageCost)}
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Costo mantenimiento por hora
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              className="bg-white"
              value={maintenanceCostHours}
              onChange={handleNumberChange(setMaintenanceCostHours)}
              placeholder="$0.00"
            />
          </div>
          <div>
            <label className="text-sm text-lime-600 block mb-2">
              Margen de ganancia (%)
            </label>
            <Input
              type="number"
              min="0"
              step="0.1"
              className="bg-white"
              value={margin}
              onChange={handleNumberChange(setMargin)}
              placeholder="0 %"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={calculate} 
            variant="outline"
            className="px-8 py-2 bg-lime-600 text-white hover:bg-lime-700"
          >
            Calcular
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardContent className="text-center p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-sky-800 mb-2">
              Estimado por impresión
            </h2>
            <div className="text-3xl font-bold text-lime-600">
              ${results.finalPrice.toFixed(2)}
            </div>
          </div>
          
          <div className="mt-7 after:border-border relative after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-5">
            <div className="border-r border-gray-300/50 last:border-r-0 md:last:border-r px-2 md:px-4 min-w-[80px] flex flex-col items-center">
              <div className="text-lg font-semibold text-sky-800 mb-1">
                ${results.resinCost.toFixed(2)}
              </div>
              <div className="text-sm text-center text-gray-600">
                Resina
              </div>
            </div>
            
            <div className="border-r border-gray-300/50 md:border-r px-2 md:px-4 min-w-[80px] flex flex-col items-center">
              <div className="text-lg font-semibold text-sky-800 mb-1">
                ${results.electricityCost.toFixed(2)}
              </div>
              <div className="text-sm text-center text-gray-600">
                Electricidad
              </div>
            </div>
            
            <div className="border-r border-gray-300/50 md:border-r px-2 md:px-4 min-w-[80px] flex flex-col items-center">
              <div className="text-lg font-semibold text-sky-800 mb-1">
                ${results.maintenanceCost.toFixed(2)}
              </div>
              <div className="text-sm text-center text-gray-600">
                Mantenimiento
              </div>
            </div>
            
            <div className="border-r border-gray-300/50 md:border-r px-2 md:px-4 min-w-[80px] flex flex-col items-center">
              <div className="text-lg font-semibold text-sky-800 mb-1">
                ${results.indirectCosts.toFixed(2)}
              </div>
              <div className="text-sm text-center text-gray-600">
                Valor de trabajo
              </div>
            </div>
            
            <div className="px-2 md:px-4 min-w-[80px] flex flex-col items-center col-span-2 md:col-span-1">
              <div className="text-lg font-semibold text-sky-800 mb-1">
                ${results.totalCost.toFixed(2)}
              </div>
              <div className="text-sm text-center text-gray-600">
                Total
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}