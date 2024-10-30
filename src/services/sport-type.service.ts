import airtableBase from './airtable.service'
import type SportType from '@/models/SportType'

const TABLE_NAME = 'Sportart'
const ACTIVE_VIEW = 'public'

const sportTypeService = {
  getList() {
    return new Promise((resolve, reject) => {
      const resultList: SportType[] = []
      airtableBase(TABLE_NAME)
        .select({
          view: ACTIVE_VIEW,
        })
        .eachPage(
          function page(partialRecords, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            partialRecords.forEach(partialRecord => {
              resultList.push({
                id: partialRecord.id,
                name: partialRecord.get('Name') as string,
                image: partialRecord.get('Picture') as any,
                notes: partialRecord.get('Notes') as string,
              })
            })
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage()
          },
          function done(err) {
            if (err) {
              reject(err)
            }
            resolve(resultList)
          },
        )
    })
  },
  getById(id: string) {
    airtableBase(TABLE_NAME).find(id, function (err, record) {
      if (err) {
        console.error(err)
        return
      }
      return record?.fields
    })
  },
}

export default sportTypeService
