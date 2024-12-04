// export async function duplicationCheck(type: 'email' | 'clientName', data: any[]): Promise<any[]> {
//     if (type === "email") {
//         return data.filter((record, index, self) =>
//             index === self.findIndex((r) => r.email === record.email)
//         );
//     }
//     if (type === "clientName") {
//         return data.filter((record, index, self) =>
//             index === self.findIndex((r) => r.clientName === record.clientName)
//         );
//     }
//     return data;
// }
