// import pipelineConfig from "CensusTracker/config/pipelineConfig.json";
// import { ProcessState } from "../models/processState";




// export class Orchestrator {
//     private state: ProcessState = { currentStep: null, steps: [], errors: [], outputs: {} };

//     async executePipeline(): Promise<void> {
//         for (const step of pipelineConfig) {
//             this.state.currentStep = step.step;
//             try {
//                 const service = this.loadService(step.service);
//                 const result = await service[step.step](step.args || {});
//                 this.state.outputs[step.step] = result;
//             } catch (error) {
//                 this.state.errors.push(step.step);
//                 console.error(`Error in step ${step.step}:`, error);
//             }
//         }
//     }

//     private loadService(serviceName: string): any {
//         switch (serviceName) {
//             case "DataProcessingService":
//                 return require("../services/dataProcessing");
//             case "ClientShellService":
//                 return require("../services/clientShell");
//             case "ClientAssignmentService":
//                 return require("../services/clientAssignment");
//             case "ProductAssignmentService":
//                 return require("../services/productAssignment");
//             case "CensusService":
//                 return require("../services/census");
//             default:
//                 throw new Error(`Unknown service: ${serviceName}`);
//         }
//     }
// }
