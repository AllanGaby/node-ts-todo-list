import { ExportToSheetFileDTO } from '@/data/common/protocols'
import faker from 'faker'

export const mockExportToSheetFileDTO = (): ExportToSheetFileDTO => {
  const column1 = faker.database.column()
  const column2 = faker.database.column()
  return {
    filePath: faker.system.filePath(),
    columns: [
      { header: column1, key: column1 },
      { header: column2, key: column2 }
    ],
    data: [{
      [column1]: faker.random.uuid(),
      [column2]: faker.random.uuid()
    },
    {
      [column1]: faker.random.uuid(),
      [column2]: faker.random.uuid()
    }
    ]
  }
}
