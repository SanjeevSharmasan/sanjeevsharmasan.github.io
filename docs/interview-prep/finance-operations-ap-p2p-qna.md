# Accounts Payable (AP) & Procure-to-Pay (P2P) - Deep Interview Q&A
## For Senior Manager & Director Level

---

### 1. FUNDAMENTALS & PROCESS FLOW

**Q: Walk me through the complete P2P (Procure-to-Pay) process end-to-end.**
A:
- **Requisition**: Department creates purchase requisition in SAP
- **Purchase Order (PO)**: Procurement approves and creates PO, sends to vendor
- **Goods Receipt (GR)**: Warehouse receives goods, creates GR in SAP (3-way match with PO)
- **Invoice Receipt**: Vendor sends invoice (via EDI, email, portal)
- **3-way Matching**: Invoice matched to PO + GR for discrepancies
- **Invoice Approval**: AP team approves invoice for payment
- **Payment Processing**: Check, wire, or ACH payment processed
- **Cash Reconciliation**: Payment reconciled to bank statement
- **GL Posting**: Expense and payable accounts updated

**Q: What are the key objectives of P2P optimization?**
A:
- **Cost Reduction**: Negotiate better rates, reduce maverick spend
- **Efficiency**: Faster processing, fewer manual steps
- **Accuracy**: Reduce errors and discrepancies
- **Cash Flow**: Extend payment terms strategically
- **Compliance**: Follow approval hierarchies, audit trails
- **Visibility**: Real-time spend analysis

**Q: Define the difference between Purchase-to-Pay and Procure-to-Pay.**
A:
- **Same concept**, different terminology
- **Purchase-to-Pay**: Focus on order fulfillment
- **Procure-to-Pay**: Broader scope including sourcing, contracting, supplier management
- **Modern usage**: P2P = end-to-end from need identification through vendor payment

---

### 2. AP PROCESS DEEP DIVE

**Q: What are the key steps in Accounts Payable?**
A:
- **Invoice Processing**:
  - 2-way match (Invoice vs PO): Non-delivery invoices, services
  - 3-way match (Invoice vs PO vs GR): Standard purchase invoices
  - 4-way match (adds payment): Sometimes used
- **Exception Handling**: Quantity variance, price variance, timing issues
- **Approval Workflow**: Based on amount, vendor, GL account
- **Payment Scheduling**: Based on payment terms, cash flow optimization
- **Deduction Management**: Handle vendor deductions (credits, returns)
- **GL Posting**: Record payable liability
- **Payment**: Cut check or initiate electronic payment

**Q: Describe AP matching (2-way, 3-way, 4-way).**
A:
- **2-way Match**: PO vs Invoice
  - Used for: Services, non-inventory items, one-time purchases
  - Risk: Invoice amounts not verified against receipt
  - Tolerance: Usually wider (±5-10%)
  
- **3-way Match**: PO vs Invoice vs Goods Receipt
  - Used for: Standard material purchases
  - Process: Invoice must match PO quantity & price, GR must confirm receipt
  - Tolerance: Tighter (±2-5%)
  - Most common in manufacturing/distribution
  
- **4-way Match**: PO vs Invoice vs GR vs Payment
  - Rarely used
  - Adds payment verification
  - Useful for: High-risk vendors or significant amounts

- **Logic**: System holds invoice if variance exceeds tolerance; requires manual approval

**Q: How do you handle invoice exceptions and discrepancies?**
A:
- **Quantity Discrepancy**: 
  - Root cause: Over-receipt, supplier error, GR timing (invoice ahead of GR)
  - Resolution: Adjust GR, adjust PO, request credit memo
  
- **Price Discrepancy**:
  - Root cause: Pricing error, contract change, surcharges
  - Resolution: Verify PO price, contact supplier, negotiate credit memo
  
- **Missing PO**:
  - Root cause: Emergency purchases, blanket orders, subscription invoices
  - Resolution: Create PO retroactively (emergency PO or non-PO invoice process)
  
- **Duplicate Invoice**:
  - Root cause: Vendor system error, invoice resubmission
  - Resolution: Flag as duplicate, request debit memo
  
- **Timing Issues**:
  - GR after invoice: Temporarily hold invoice, release when GR received
  - Invoice without GR: Deferred invoice posting, release on GR

**Q: What's a non-PO invoice process?**
A:
- **Use Cases**:
  - Utilities, subscriptions, SaaS
  - Emergency purchases
  - Consignment inventory
  - One-time expenses
  
- **Process**:
  - 2-way match (invoice vs master data/contract)
  - Manual GL coding
  - Manual approval (usually required for all non-PO)
  - Limited matching tolerance
  
- **Risk**: Higher fraud risk, manual effort intensive
- **Solution**: Implement invoice templates, master contracts, subscription management

---

### 3. PAYMENT PROCESSING & CASH OPTIMIZATION

**Q: Describe the payment processing cycle.**
A:
- **Payment Run**: Scheduled process (daily/weekly/monthly)
- **Invoice Selection**: Based on due date, terms, cash availability
- **Payment Method Selection**:
  - ACH (domestic, 1-2 days)
  - Wire (faster, higher fees)
  - Check (slow, manual)
  - Card payments (for certain categories)
  - SEPA (Europe), international wire
  
- **Posting**: Payment posting to AP ledger
- **Bank**: Payment transmitted to bank
- **Reconciliation**: Bank statement matching
- **Discrepancies**: Investigate unmatched amounts

**Q: How do you optimize payment terms and early payment discounts?**
A:
- **Payment Term Analysis**:
  - Current average payment days
  - Supplier concentration: Who receives 90% of spend
  - Discount rates: 2/10 Net 30 (2% discount if paid in 10 days)
  
- **Early Payment Discount ROI**:
  - Example: 2% discount to pay 20 days early
  - Annualized benefit: 2% × (365÷20) = 36.5% ROI!
  - **Decision**: Take discount if cash position allows
  
- **Extend Payment Terms**:
  - Negotiate longer terms (60/90 days) with key vendors
  - Improves Days Payable Outstanding (DPO)
  - Positive cash flow impact
  - Risk: Supplier relationship, potential higher prices
  
- **Liquidity Optimization**:
  - Pay early discounts (high ROI)
  - Extend long-term, low-priority vendor terms
  - Strategic payment timing based on cash forecast

**Q: Explain dynamic discounting and supply chain financing.**
A:
- **Dynamic Discounting**: Vendor offers graduated discounts based on early payment
  - Example: 3% off pay in 5 days, 2% off pay in 10 days, net 30
  - Win-win: Vendor gets early cash, buyer gets discount
  - Platforms: Coupa, Paylocity, C2FO
  
- **Supply Chain Financing (SCF)**:
  - Vendor extends long payment terms
  - Financial institution provides early payment option
  - Vendor can sell invoice to bank for ~95% value, get cash early
  - Buyer: Maintains long terms, vendor happy
  - Platform: Bank operates, charges fee
  
- **Benefits**:
  - Improved cash flow for both parties
  - Vendor liquidity relief
  - Reduced working capital pressure
  - Negotiating leverage

---

### 4. SYSTEMS & TECHNOLOGY IMPLEMENTATION

**Q: How do you implement AP/P2P in SAP ECC?**
A:
- **Procurement (MM)**:
  - ME11: Create purchase info record
  - ME21N: Create purchase order
  - MIGO: Goods receipt, invoice receipt
  - ME51N: Purchase requisition
  
- **Accounts Payable (FI)**:
  - FK01: Create vendor master
  - FBL1N: Vendor balance inquiry
  - FI-AP (subledger): Invoice posting, payment posting
  
- **3-way Matching (MRBR)**:
  - MRBR: Analyze blocking reasons
  - OMRB: Configure tolerance groups
  - Automatic matching on receipt or invoice, whichever is later
  
- **Payment (FI)**:
  - F110: Payment run (create proposal, post, release for payment)
  - FBZP: Payment proposal maintenance
  
- **Key Tables**:
  - EKKO (PO header), EKPO (PO line)
  - MSEG (Material ledger)
  - LFA1 (Vendor master), LFB1 (Vendor company data)
  - BSAK (Open payables), BSAS (Paid payables)

**Q: What's different in SAP S/4HANA for P2P?**
A:
- **Simplified Data Model**: Single document architecture (no separate invoice document)
- **Real-time Matching**: 3-way match validation at receipt line level
- **ML for Exception Detection**: Anomaly detection for fraud, duplicate invoices
- **Embedded Analytics**: Real-time spend visibility, vendor performance
- **Integration Ready**: APIs for external procurement/invoice platforms
- **Invoice Management**: Integration with document capture solutions (SAP Intelligent Robotic Process Automation)
- **Supplier Portal**: Direct communication, PO visibility, invoice submission
- **Advanced Dunning**: Outbound (for AP - to vendors)

**Q: Describe JDE implementation for P2P.**
A:
- **Procurement (P3400)**:
  - P4301: Purchase Order Entry
  - P43202: Receive Goods
  - P43800: Buyer workbench
  
- **Accounts Payable (F0410)**:
  - P0430: Enter Vouchers (invoices)
  - P0411: Voucher Match
  - P0420: Batch AP Posting
  - P0900: Payment Processing
  
- **Key Tables**:
  - F4301 (PO header), F4311 (PO detail)
  - F4301Z1 (Attachments)
  - F0411 (AP Voucher ledger)
  - F4106 (Receipts master)
  
- **Processing**: Batch-oriented, less real-time than S/4HANA

**Q: How would you integrate ServiceNow with P2P (SAP/JDE)?**
A:
- **Procurement Module**: ServiceNow procurement workflow
- **Integration Points**:
  - Rest API: Real-time PO creation from ServiceNow to SAP
  - Receipt notifications: SAP updates ServiceNow when GR happens
  - Invoice sync: Invoices reflected in ServiceNow for visibility
  
- **Use Cases**:
  - Requisition approval workflow in ServiceNow
  - Purchase order tracking
  - Receipt status visibility
  - Invoice management (dispute, discrepancy reporting)
  
- **Benefits**:
  - Unified system for IT/business procurement
  - Better tracking and reporting
  - Automated workflows across systems

---

### 5. VENDOR MANAGEMENT & FRAUD PREVENTION

**Q: Explain vendor master data management.**
A:
- **Critical Fields**:
  - Legal vendor name, tax ID (1099/W9)
  - Payment terms (standard payment days)
  - Payment method (ACH bank, check address)
  - GL account (default account for invoices)
  - Approval levels (automatic payment limit if applicable)
  - Currency and price terms
  
- **Validation**:
  - Tax ID verification (IRS database)
  - Address validation (matches POs and invoices)
  - OFAC screening (sanctions, terrorism watch lists)
  - Duplicate prevention (same legal entity, different IDs)
  
- **Maintenance**:
  - Regular vendor review (semi-annual)
  - Deactivate inactive vendors
  - Update payment methods
  - Monitor vendor consolidation

**Q: How do you prevent fraud and duplicate payments in AP?**
A:
- **Invoice Duplicate Prevention**:
  - System blocking: If invoice # + vendor + amount matches recent invoice, flag
  - Workflow: Manual review before posting
  - Regular audit: Report of suspected duplicates for investigation
  
- **Payment Fraud Prevention**:
  - Vendor master integrity: No invoices from unknown vendors
  - Payment method verification: ACH details match approved vendor records
  - Segregation of duties: Different people approve invoices vs. release payments
  - Dual approval: Required for large payments or new vendors
  - Positive pay: Bank service, matches issued check numbers/amounts
  
- **Invoice Authenticity**:
  - Verify invoice sources (email spoofing risk)
  - PO requirement: No payment without PO (except approved exceptions)
  - Vendor communication: Call vendor to confirm invoice before payment
  
- **AP Specific Risks**:
  - Change of payment address (vendor compromise)
  - Unusual invoice amounts
  - Missing standard documentation
  - Duplicate PO numbers
  
- **Mitigation Tools**:
  - AP automation (reduces manual touch)
  - Invoice verification workflows
  - Vendor communication protocols
  - Regular AP audits and reconciliations

**Q: Describe vendor performance management.**
A:
- **KPIs**:
  - On-time Delivery %
  - Quality (defect rate, returns)
  - Pricing competitiveness
  - Responsiveness to issues
  - Payment history (do we receive invoices on time?)
  
- **Scorecards**:
  - Monthly vendor scorecard
  - Weighted categories (delivery 40%, quality 30%, pricing 20%, service 10%)
  - Monthly reviews with vendors
  
- **Segmentation**:
  - Critical vendors (sole source, high spend)
  - Standard vendors (multiple options)
  - Commodity vendors (easily replaceable)
  
- **Actions**:
  - High performers: Preferred vendor status, better terms
  - Under-performers: Corrective action plans, potential replacement
  - Critical failures: Escalation, possible termination

---

### 6. INVOICING MODELS & SPECIAL SCENARIOS

**Q: How do you handle various invoicing scenarios in AP?**
A:
- **Single PO, Single Invoice**: Standard case
  
- **Single PO, Multiple Invoices**: 
  - Vendor splits into multiple invoices (partial shipments)
  - Each invoice must reference PO number, line number
  
- **Multiple POs, Single Invoice**:
  - Vendor consolidates into one invoice
  - Risk: Matching complexity, needs clear line-level references
  - Solution: Use consolidated invoicing agreement
  
- **Blanket POs**:
  - Long-term standing order (e.g., "buy up to $100K of MRO supplies")
  - Releases: Scheduled or demand-based releases
  - Invoices: Against release numbers, not full PO
  
- **Subscription/Recurring Invoices**:
  - SaaS, maintenance contracts, utilities
  - Recurring monthly/quarterly invoices
  - Automation: Generate matching documents automatically
  
- **Intercompany Invoicing**:
  - One company code invoices another
  - Markup rules (transfer pricing)
  - GL elimination entries on consolidation

**Q: Explain invoice management platforms and e-invoicing.**
A:
- **Invoice Management Platforms**: Coupa, Ariba, Concur, Basware
  - Vendor portal: Vendors submit invoices directly
  - OCR + Extraction: Auto-extract data from PDFs
  - Matching: Auto 3-way match
  - Approval workflows: Route to appropriate approvers
  - Integration: Connected to SAP, JDE for GL posting
  
- **e-Invoicing Standards**:
  - UBL (Universal Business Language): XML standard
  - ZUGFeRD (Germany): Hybrid PDF + XML
  - Peppol (Pan-European): Network for e-invoicing
  - Benefit: Structured data, reduced manual entry
  
- **Implementation ROI**:
  - Reduced processing cost: $5-10 per invoice manually, $0.50 automated
  - Faster processing: 7-10 days down to 2-3 days
  - Better discounts: Early payment discounts now worth capturing
  - Improved accuracy: OCR 95%+, fewer disputes

---

### 7. PROCESS AUTOMATION & RPA

**Q: Which P2P processes are best for RPA automation?**
A:
- **High-Value RPA Candidates**:
  - Invoice processing: Extract PO #, vendor, amount, codes from PDF
  - GR creation: Auto-create 2-way receipt when invoice received without GR
  - Invoice matching: Compare invoice to PO automatically, flag discrepancies
  - Data coding: Intelligent GL account assignment based on description
  - Deduction management: Match deductions to invoices, create credit memo
  - Payment processing: Run payment engine, generate payment files
  
- **RPA Limitations**:
  - Requires stable, repeatable process
  - Can't handle too many exceptions
  - Invoice format changes require retraining
  
- **Better Alternatives**:
  - OCR + ML (better for invoice extraction)
  - Intelligent document processing (IDP) - combines OCR + ML + RPA
  - Invoice management platforms (Coupa, Ariba) - purpose-built

---

### 8. COMPLIANCE & CONTROLS

**Q: Explain segregation of duties (SOD) in P2P.**
A:
- **Key Segregations**:
  - **Requisition vs. Approval**: Different people create and approve
  - **PO vs. Approval**: Buyer creates, manager approves
  - **Approval vs. Receipt**: Approver ≠ person receiving goods
  - **Receipt vs. Invoice**: Goods receipt person ≠ invoice approver
  - **Invoice Approval vs. Payment**: Different approval chains
  - **Payment Release vs. Bank Reconciliation**: Different people
  
- **System Controls**:
  - Role-based access (buyer, approver, receiver, AP clerk, payment processor)
  - Approval hierarchies based on amount
  - System blocks conflicting roles (same person can't create AND approve above threshold)
  
- **Monitoring**:
  - Monthly SOD compliance report
  - Investigate violations
  - Remediation: Reassign duties or approve exceptions with justification

**Q: What controls do you implement for payment integrity?**
A:
- **Preventive Controls**:
  - Positive pay: Bank service validates check number, amount, payee
  - Dual approval: Large payments require 2 signers
  - Vendor master controls: Strict maintenance, verification
  - 3-way match: System validates before payment
  
- **Detective Controls**:
  - Bank reconciliation: Monthly match of check payments
  - AP aging: Identify unusually old or large payables
  - Duplicate invoice review: Automated and periodic manual
  - Unusual payment analysis: Amounts, vendors, payment methods
  
- **Corrective Controls**:
  - Payment stop: Halt payment if issues detected
  - Bank recall: Retrieve wire if caught in time
  - Debit memo: Request refund for overpayments
  - Root cause analysis: Prevent recurrence

**Q: Describe P2P audit focus areas.**
A:
- **Invoice Testing**: Sample 20-30 invoices
  - 3-way match validation (PO, GR, invoice)
  - Approval verification (signed off by authorized approver)
  - GL coding accuracy
  - Timeliness (invoice posted promptly)
  
- **Payment Testing**: Sample payments
  - Vendor master validation
  - Payment amount matches approved invoice
  - Payment method correct for vendor
  - Bank reconciliation: Payment cleared on expected date
  
- **Fraud Indicators**:
  - Duplicate invoices/payments
  - Payment method changes (especially email vendor)
  - Unusual payment amounts or vendors
  - Missing or altered documentation
  
- **System Configuration**:
  - Tolerance groups and matching rules configured per policy
  - Approval hierarchies reflect organization structure
  - Access controls appropriate

---

### 9. METRICS & OPTIMIZATION

**Q: What are key P2P metrics?**
A:
- **Cycle Time**:
  - Requisition to PO: # days to approve and send PO
  - PO to Goods Receipt: # days to receive goods
  - Receipt to Invoice: # days from GR to invoice received
  - Invoice to Payment: # days from invoice to payment (should match terms)
  - Total P2P: End-to-end days
  
- **Cost Metrics**:
  - Spending under management (% of total spend on contracts)
  - Savings vs. budget (price reductions, volume consolidation)
  - Compliance spend (% from approved vendors)
  
- **Quality Metrics**:
  - Matching accuracy (% 3-way matches without exceptions)
  - Invoice accuracy (% first-pass approved without corrections)
  - On-time payment % (% paid by due date)
  - Discount realization (% of available discounts captured)
  
- **Efficiency Metrics**:
  - Cost per invoice ($)
  - STP rate (% invoices processed without manual touch)
  - AP FTE productivity (# invoices processed per FTE per month)
  
- **Volume Metrics**:
  - # POs created
  - # GRs processed
  - # invoices received
  - # payments processed

**Q: Describe a P2P transformation roadmap.**
A:
- **Phase 1 (Months 1-3): Foundation**
  - Current state process mapping and metrics baseline
  - Identify top pain points (high exceptions, slow cycles, cost leakage)
  - Define target state and KPIs
  
- **Phase 2 (Months 4-6): Quick Wins**
  - Invoice platform implementation or upgrade
  - Vendor master cleanup (deactivate, consolidate, verify)
  - Payment term optimization (negotiate extensions, capture discounts)
  - Process standardization (reduce variation)
  
- **Phase 3 (Months 7-12): System Improvements**
  - ECC to S/4HANA upgrade (if planned)
  - Integration improvements (e-invoicing, supply chain financing)
  - RPA implementation for high-volume exceptions
  
- **Phase 4 (Months 12+): Optimization**
  - Predictive analytics (payment behavior, fraud detection)
  - AI-based matching improvements
  - Supplier collaboration portal
  - Continuous improvement culture

---

### 10. AUTOBANK, SERRALA & SPECIALIZED PLATFORMS

**Q: What is Autobank and how is it used in AP/P2P?**
A:
- **Autobank Overview**: Payment factory solution, focuses on payment processing
- **Capabilities**:
  - Multi-channel payment: ACH, wire, check, card, SEPA
  - Multi-currency support
  - Compliance: OFAC screening, sanctions lists
  - Bank integration: Direct connectivity to multiple banks
  - Payment workflows: Approval hierarchies, dual approval
  
- **Use Cases**:
  - Centralized payment processing for multi-company/multi-region
  - Automated payment file generation (NACHA, SWIFT, etc.)
  - Bank reconciliation: Auto-matching payments to bank feeds
  - Real-time cash visibility across banks
  
- **Integration with SAP/JDE**:
  - Interface with AP module (reads payment proposals)
  - Generates payment files directly to banks
  - Returns reconciliation data to GL

**Q: What is Serrala and its role in P2P?**
A:
- **Serrala Overview**: Invoice-to-cash and payment processing platform
- **Capabilities**:
  - Invoice processing (AR and AP): OCR, extraction, matching
  - Invoice management workflow
  - e-invoicing: Peppol, UBL, ZUGFeRD support
  - Supply chain financing
  - Collections management (AR side)
  
- **AP-Specific**:
  - Vendor invoice ingestion (email, EDI, portal)
  - 3-way matching with visual confirmation
  - Exception management
  - Integration to SAP/JDE for GL posting
  
- **Benefits**:
  - Faster invoice processing (OCR accuracy >95%)
  - Better exception handling (AI-based decision support)
  - E-invoicing compliance (prepare for mandates)
  - Vendor portal: Direct invoice submission

**Q: Autobank + Serrala integration for complete P2P.**
A:
- **Workflow**:
  1. Serrala: Ingests vendor invoice, 3-way matching
  2. Approval: Invoice approved in Serrala workflow
  3. GL Posting: Invoice posted to SAP/JDE (payable liability)
  4. Payment: Invoice available in payment proposal
  5. Autobank: Reads proposal, creates payment proposal
  6. Approval: Payment approved in Autobank (dual approval)
  7. Payment: Autobank sends payment to bank
  8. Bank: Payment executes
  9. Reconciliation: Bank feed returns to both systems
  
- **Benefits**:
  - Complete automation: Invoice to cash to bank
  - Best-of-breed solutions: Serrala for invoicing, Autobank for payment
  - Real-time visibility: Both systems integrated
  - Compliance: Built-in controls, audit trails

---

### 11. STRATEGIC INITIATIVES

**Q: How do you reduce Days Payable Outstanding (DPO) responsibly?**
A:
- **DPO = (Accounts Payable ÷ Cost of Goods Sold) × 365**
  - High DPO: Good for cash flow but may damage vendor relationships
  - Low DPO: Poor for cash management but good vendor relations
  - Industry average: 30-45 days
  
- **Extension Strategies**:
  - Negotiate longer terms with key vendors (60-90 days)
  - Consolidate spend: Volume leverage for better terms
  - Payment terms matching: Match payment timing to receivables collection
  
- **Risk Management**:
  - Maintain vendor relationships: Don't overuse payment delays as tactic
  - Quality continuity: Ensure suppliers don't cut corners due to cash pressure
  - Contingency planning: Have alternatives if key suppliers cut off credit
  
- **Measurement**:
  - Track DPO trend monthly
  - Segment by vendor type/criticality
  - Monitor vendor feedback and satisfaction

**Q: Describe a spend analysis program.**
A:
- **Objective**: Understand organizational spending patterns, identify savings
- **Scope**: All spend (not just procurement - includes travel, subscriptions, services)
- **Process**:
  1. **Data Collection**: Pull all invoice/payment data from GL, AP
  2. **Cleaning**: Standardize vendor names, categories, accounts
  3. **Classification**: Code all transactions with commodity/category codes
  4. **Analysis**:
     - Top 20 vendors (typically 80% of spend)
     - Spend by category (materials, services, overhead)
     - Spend by business unit/location
     - Contract vs. non-contract spend
     - Savings opportunities
  5. **Opportunities**:
     - Vendor consolidation: Reduce number of suppliers
     - Negotiation: Leverage volume for discounts
     - Standardization: Use preferred vendors/products
     - Compliance: Recover off-contract spending
  
- **Expected Savings**: 5-15% reduction possible, $500K-$5M depending on spend

---

### KEY TAKEAWAYS FOR INTERVIEWS

✅ **Own the P2P flow**: Requisition → PO → Receipt → Invoice → Match → Approval → Payment → Reconciliation

✅ **3-way matching is critical**: PO-Receipt-Invoice validation prevents overpayment and fraud

✅ **Know SAP transactions**: ME21N (PO), MIGO (Receipt), FI (Invoice/Payment), F110 (Payment Run)

✅ **Master cash optimization**: Early payment discounts ROI, payment term negotiations, DPO management

✅ **Be familiar with platforms**: Mention Coupa, Ariba, Serrala, Autobank as solutions

✅ **Real examples**: "I implemented Serrala, reducing invoice processing time from 7 days to 2 days and achieving 98% STP rate"

✅ **Understand fraud controls**: SOD, positive pay, vendor master integrity, duplicate prevention

✅ **Modern thinking**: RPA, AI-based matching, e-invoicing compliance, supply chain financing
