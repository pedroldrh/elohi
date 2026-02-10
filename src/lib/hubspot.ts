const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

export async function syncLeadToHubSpot(lead: {
  email: string;
  company: string;
  role: string;
}) {
  if (!hubspotToken) {
    console.log("[HubSpot] No token configured. Sync skipped:", lead.email);
    return null;
  }

  // Placeholder for HubSpot API integration
  // When ready, use the HubSpot Contacts API:
  // POST https://api.hubapi.com/crm/v3/objects/contacts
  console.log("[HubSpot] Would sync lead:", lead.email);
  return null;
}
