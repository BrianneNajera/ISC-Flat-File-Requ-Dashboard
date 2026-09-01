const sharePointBase = 'https://honaero.sharepoint.com/:x:/r/teams/EDWMigration-ISCMetrics/_layouts/15/Doc.aspx?sourcedoc=';
const sharePointSuffix = '&action=default&mobileredirect=true';
const source = (id, file) => `${sharePointBase}${encodeURIComponent(`{${id}}`)}&file=${file}${sharePointSuffix}`;
const csvAssetPath = (file) => `assets/template-csv/${file.replace(/\.xlsx$/i, '.csv')}`;

const templates = [
  ['XREF_GL_ACCOUNT', 'EDW_AERO_ISC_XREF_GL_ACCOUNT.xlsx', 'B34B5C9E-247F-4C62-9C84-8072A5331EA5', 'Finance: Julie Ehrenreich / Lino Rivera', 'As needed', 'Manual'],
  ['XREF_SBU_FGI_RECLASS', 'EDW_AERO_ISC_XREF_SBU_FGI_RECLASS.xlsx', '6F4CE338-96D3-4679-81B5-6EB13DFF715A', 'Planning: Jessica Ruiz-Santiago / Ben Paasch', 'Yearly', 'Manual'],
  ['XREF_FSH_ALLOCATION_RATES', 'EDW_AERO_ISC_XREF_FSH_ALLOCATION_RATES.xlsx', '047AB6D0-7D51-4378-B636-35F86AE318FB', 'Planning: Brad Schneider', 'Yearly', 'Manual'],
  ['XREF_ALLOCATION_RATES', 'EDW_AERO_ISC_XREF_AMR_ALLOCATION_RATES.xlsx', '4BC4017C-98F9-48EF-ADC7-CE446C26D282', 'Finance: Lino Rivera / Amanda Picha', 'Yearly', 'Manual'],
  ['XREF_NON_SAP_SITES', 'EDW_AERO_ISC_XREF_NON_SAP_SITES.xlsx', '2B881EC8-183C-4B39-98CE-FBC1747CCC10', 'Finance: Nolan Powell / Connor Wong', 'Monthly', 'Manual'],
  ['XREF_AGED_WIP_TRACKER', 'EDW_AERO_ISC_XREF_AGED_WIP_TRACKER.xlsx', '61BE0FC3-5911-4056-AA77-E9C73B922DD5', 'Finance: Camryn Gray', 'Yearly', 'Manual'],
  ['XREF_IOS_DEMAND', 'EDW_AERO_XREF_ISC_GPD_DEAMND.xlsx', '23EA3043-E41A-4757-9FC2-97C517C531FA', 'Finance: Jesse Jirousek', 'Quarterly', 'Manual', true],
  ['XREF_IOS_DEMAND', 'EDW_AERO_XREF_ISC_SPEX_DEAMND.xlsx', '221D31B6-5575-4B5D-A1DA-A78B3E68F611', 'Finance: Jesse Jirousek', 'Quarterly', 'Manual', true],
  ['XREF_IOS_DEMAND', 'EDW_AERO_XREF_ISC_SERVIGISTICS_DEAMND.xlsx', '264382FB-472A-4A5F-A49C-1BA10E19C04E', 'Finance: Jesse Jirousek', 'Quarterly', 'Manual', true],
  ['XREF_IOS_DEMAND', 'EDW_AERO_XREF_ISC_LTB_DEAMND.xlsx', 'B93CF0BB-52B6-4A0A-8D41-8F4F1B9D948E', 'Finance: Jesse Jirousek', 'Quarterly', 'Manual', true],
  ['XREF_ISC_IOS_WAIVER', 'EDW_AERO_XREF_IOS_WAIVER.xlsx', '2EFA1D83-0FD3-4A6E-957E-E109022B9048', 'Finance: Camryn Gray', 'Quarterly', 'Manual', true],
  ['XREF_OP_CENTER', 'EDW_AERO_ISC_XREF_OP_CENTER.xlsx', '7D6CDCC2-A233-4BD3-9FFA-5C1BB4EE99DE', 'Finance & ISCA', 'As needed', 'Manual'],
  ['XREF_OP_CENTER', 'EDW_AERO_ISC_XREF_OP_CENTER_PROCUREMENT.xlsx', '1B6E6FD9-2D3B-4EE0-9E77-C8DEBF0FA1DB', 'Julie Ehrenreich / Chenin Rogers', 'As needed', 'Manual'],
  ['XREF_OP_CENTER', 'EDW_AERO_ISC_XREF_OP_CENTER_PLANNING.xlsx', '22675B20-8772-484D-9A81-733229864355', 'Julie Ehrenreich / Chenin Rogers', 'As needed', 'Manual'],
  ['XREF_OP_CENTER', 'EDW_AERO_ISC_XREF_OP_CENTER_DELIVERY.xlsx', '09FDB507-FD65-4594-9856-D67759C7783C', 'Chenin Rogers / ISCA', 'As needed', 'Manual'],
  ['XREF_OP_CENTER', 'EDW_AERO_ISC_XREF_OP_CENTER_QUALITY.xlsx', 'B59E398E-B0EB-410D-9E33-D2CA605236EC', 'Chenin Rogers / ISCA', 'As needed', 'Manual'],
  ['XREF_ISC_SUPPLIER_SCORECARD_BASELINE', 'EDW_AERO_ISC_SUPP_SCORECARD_BASELINE_UPDATE.xlsx', '3B2B847F-D0FB-4EB1-950C-48A8C13E08D4', 'Sourcing: Tom Roberts', 'As needed', 'Manual', true],
  ['XREF_ISC_MATERIAL_PLANT_BASELINE_PRICE', 'EDW_AERO_ISC_XREF_MATERIAL_PLANT_BASELINE_PRICE.xlsx', 'B37D516E-3642-49BD-BB4E-9D360CA708D4', 'Sourcing: Prathap Kaggala', 'As needed', 'Manual', true],
  ['XREF_PAYMENT_CALENDAR', 'PAYMENT_CALENDAR_AERO.xlsx', '016D3497-6252-48F2-9989-21F77EC48B51', 'Sourcing: Nitish Ganiga', 'Yearly', 'Manual'],
  ['XREF_DOLPHIN_AP_HOLIDAY_CALENDAR', 'EDW_AERO_ISC_DOLPHIN_AP_HOLIDAY_CALENDAR.xlsx', '0E17B034-1BC5-4414-A6A6-AF169953DC63', 'Sourcing: Nitish Ganiga', 'Yearly', 'Manual'],
  ['FACT_AOP_METRICS', 'EDW_AERO_ISC_AOP_METRIC_INVENTORY.xlsx', '2F1B0C62-E87F-4AF2-94C7-438ECF8652B7', 'Net Inventory: Brad Schneider', 'Yearly', 'Manual'],
  ['XREF_SOURCING_HIERARCHY', 'EDW_AERO_ISC_SOURCING_HIERARCHY.xlsx', '9822BF27-D6E3-4106-A8F0-205FDD1E3CC0', 'Sourcing: Tom Roberts', 'Daily', 'Automated'],
  ['XREF_ISC_VMI_SIGNED_VS_TARGETED_DATA', 'EDW_AERO_ISC_VMISignedvaTargetedData.xlsx', 'C62E7400-DA61-425E-AF68-17283901B75A', 'Sourcing: Tom Roberts', 'Weekly', 'Automated'],
  ['XREF_PLANT_CELL_CONFIG', 'EDW_AERO_ISC_PLANT_CELL_CONFIG.xlsx', '585E8C2B-34C3-429C-AA82-3D452826ED3D', 'ISC Analytics: Gene Aguas', 'Daily', 'Automated'],
  ['XREF_MATERIAL_PLANT_CHRONIC_RANK', 'EDW_AERO_ISC_CHRONIC_RANK.xlsx', 'FC167064-DCCE-4734-A8CA-6F19B519F8A9', 'Sourcing: Kueyson Yee', 'Monthly', 'Automated'],
  ['XREF_CUSTOMER_SHORTAGE_PEGGING', 'EDW_AERO_ISC_SHORTAGE_REPORT.xlsx', '38446672-342D-4222-A490-9574137D2AAB', 'Planning: Clark McClurg', 'Daily', 'Automated'],
  ['FACT_COCKPIT_METRICS', 'CockpitDataExport.xlsx', null, 'ISC Analytics: Nicole Nasta', 'Weekly', 'Automated', false, false, 'assets/CockpitDataExport.xlsx'],
  ['XREF_KEYCODE_ORG', 'EDW_AERO_ISC_KEYCODE_ORG.xlsx', '', 'TBD', 'Weekly', 'Automated', false, true],
  ['XREF_PART_FAMILY_CODE', 'XREF_PART_FAMILY_CODE.xlsx', null, 'TBD', 'As needed', 'Manual', false, false, 'assets/XREF_PART_FAMILY_CODE.xlsx']
];

const xrefTablePath = '/Distribution / CORP / EDW_GENERAL / LANDING / ISC / XREF_TABLES';
const iosPath = '/Distribution / CORP / EDW_ITAR / LANDING / ISC / IOS';
const table = document.querySelector('#template-table');
const modelCounts = templates.reduce((counts, [model]) => ({ ...counts, [model]: (counts[model] || 0) + 1 }), {});
const renderedModels = new Set();
for (const [model, file, id, owner, frequency, type, defect, pending, externalUrl] of templates) {
  const csvUrl = csvAssetPath(file);
  const localAssetUrl = externalUrl ? externalUrl.replace(/\.xlsx$/i, '.csv').replace(/^assets\//, 'assets/template-csv/') : null;
  const url = localAssetUrl || csvUrl;
  const displayFile = file.replace(/\.xlsx$/i, '.csv');
  const link = !url ? `<span class="template-link pending">${displayFile}</span>` : `<a class="template-link${pending ? ' pending' : ''}" href="${url}" target="_blank" rel="noopener">${displayFile}</a>`;
  const typeValue = defect ? `<span class="type-with-indicator">${type}<span class="defect-dot defect-inline" aria-label="Defect report available"></span></span>` : type;
  const modelCell = renderedModels.has(model) ? '' : `<td class="data-model" rowspan="${modelCounts[model]}">${model}</td>`;
  renderedModels.add(model);
  const pathValue = model.includes('IOS') || model.includes('IOS_WAIVER') ? iosPath : xrefTablePath;
  table.insertAdjacentHTML('beforeend', `<tr>${modelCell}<td>${link}</td><td>${owner}</td><td>${frequency}</td><td>${typeValue}</td><td class="path">${pending ? 'TBD' : pathValue}</td></tr>`);
}

document.querySelectorAll('.instruction-image img').forEach((image) => {
  image.addEventListener('error', () => {
    image.closest('.instruction-image').hidden = true;
  });
});

const csvCallout = document.querySelector('.csv-callout');
const namingHeading = [...document.querySelectorAll('.risk-grid h3')].find((heading) => heading.textContent.trim() === 'NAMING CONVENTIONS:');
if (csvCallout && namingHeading) {
  const namingList = namingHeading.nextElementSibling;
  const namingBlock = document.createElement('div');
  namingBlock.className = 'naming-block';
  namingBlock.append(namingHeading, namingList);

  const finalNotesHeading = [...document.querySelectorAll('.risk-grid h3')].find((heading) => heading.textContent.trim() === 'FINAL NOTES:');
  if (finalNotesHeading && finalNotesHeading !== namingHeading) {
    const notesList = finalNotesHeading.nextElementSibling;
    if (notesList && notesList.tagName === 'UL') {
      const finalNotesBlock = document.createElement('div');
      finalNotesBlock.className = 'final-notes-block';
      finalNotesBlock.append(finalNotesHeading, notesList);

      const filePathFigure = document.createElement('figure');
      filePathFigure.className = 'file-path-figure';
      filePathFigure.innerHTML = '<img src="assets/File Path.png" alt="MoveIT folder path screenshot" onerror="this.parentElement.hidden = true">';
      finalNotesBlock.append(filePathFigure);

      namingBlock.append(finalNotesBlock);
    }
  }

  csvCallout.append(namingBlock);
}
