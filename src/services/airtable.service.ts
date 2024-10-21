import Airtable from 'airtable'

const airtableBase = new Airtable({
  apiKey: import.meta.env.VITE_APP_AIRTABLE_API_KEY
}).base(import.meta.env.VITE_APP_AIRTABLE_BASE)

export default airtableBase