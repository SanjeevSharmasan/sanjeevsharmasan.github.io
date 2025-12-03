# Finance Interview Quick Reference Cards
## Memorize These Before Your Interview

---

## 🚀 CRITICAL METRICS & FORMULAS

### **Days Sales Outstanding (DSO)**
```
DSO = (Accounts Receivable ÷ Daily Revenue) × 1
    = (AR balance ÷ (Annual Revenue ÷ 365))

Example:
- AR balance: $30M
- Annual revenue: $300M (Daily = $821K)
- DSO = $30M ÷ $821K = 36.5 days

Target: 30-40 days (varies by industry)
Improvement: Invoice at shipment (-3-5 days)
            Automated dunning (-3-5 days)
            Early pay discount (-2-3 days)
            Better collections (-3-5 days)
Total possible improvement: 10-20 days
```

### **Days Payable Outstanding (DPO)**
```
DPO = (Accounts Payable ÷ COGS) × 365

Example:
- AP balance: $20M
- Annual COGS: $300M
- DPO = ($20M ÷ $300M) × 365 = 24 days

Strategy: Extend from 30 to 45 days
- Benefit: (45-30)/365 × $300M = $12.3M cash freed up
- Risk: Vendor relationships, potential price increases
```

### **Cash Conversion Cycle (CCC)**
```
CCC = Days Inventory Outstanding (DIO)
    + Days Sales Outstanding (DSO)
    - Days Payable Outstanding (DPO)

Example:
CCC = 40 + 35 - 45 = 30 days

Interpretation:
- 30 days of cash tied up in operations
- Target: 10-20 days
- Negative CCC: Customers pay before we pay vendors (excellent)

Improvement levers:
- Reduce DIO: Better inventory management, just-in-time
- Reduce DSO: Faster invoicing, better collections
- Increase DPO: Extend payment terms (but carefully)
```

### **Early Payment Discount ROI**
```
2/10 Net 30 = Pay 2% discount if paid in 10 days vs. 30 days

Days saved: 30 - 10 = 20 days
Discount: 2%
Annual return: 2% × (365 ÷ 20) = 36.5%

→ ALWAYS take discount if you have liquidity!

Other examples:
1/10 Net 30 = 1% × (365÷20) = 18.25%
3/15 Net 45 = 3% × (365÷30) = 36.5%
```

---

## 💰 PROFITABILITY ANALYSIS

### **Gross Margin**
```
Gross Margin = (Revenue - COGS) ÷ Revenue × 100%

Example:
Revenue: $100M
COGS: $40M
Gross Margin = $60M ÷ $100M = 60%

Industry benchmarks:
- Manufacturing: 30-40%
- Retail: 20-40%
- SaaS: 60-80%
- Services: 40-70%
```

### **Operating Margin**
```
Operating Margin = (Operating Income ÷ Revenue) × 100%
= (Revenue - COGS - Operating Expenses) ÷ Revenue

Example:
Revenue: $100M
COGS: $40M
OpEx: $35M
Operating Income: $25M
Operating Margin = 25%

Target: Improve 1-2% per year
Method: Volume leverage (OpEx doesn't scale with revenue)
```

### **Return on Equity (ROE)**
```
ROE = Net Income ÷ Shareholder Equity × 100%

Example:
Net Income: $10M
Equity: $50M
ROE = $10M ÷ $50M = 20%

Industry benchmark: 15-20% is healthy
```

---

## 📊 FINANCIAL RATIOS TO KNOW

### **Liquidity Ratios** (Can we pay short-term obligations?)
```
Current Ratio = Current Assets ÷ Current Liabilities
- Healthy: >1.5
- Example: $100M assets ÷ $60M liabilities = 1.67

Quick Ratio = (Current Assets - Inventory) ÷ Current Liabilities
- More conservative (excludes inventory)
- Healthy: >1.0
```

### **Leverage Ratios** (How much debt?)
```
Debt-to-Equity = Total Debt ÷ Total Equity
- Industry dependent
- 1.0 = neutral (50/50 debt vs. equity)
- <1.0 = conservative
- >2.0 = aggressive

Interest Coverage = EBITDA ÷ Interest Expense
- Safe: >3.0x (can cover interest 3 times over)
- Risk: <2.0x (struggling to pay interest)
```

### **Efficiency Ratios** (How productively do we use assets?)
```
Asset Turnover = Revenue ÷ Total Assets
- Example: $100M revenue ÷ $250M assets = 0.4x
- Higher is better (more revenue per asset)

Inventory Turnover = COGS ÷ Inventory
- Example: $40M COGS ÷ $8M inventory = 5x
- 5x = inventory replaces 5 times per year
- Higher is better (don't tie up cash)

Receivables Turnover = Revenue ÷ AR
- Inverse of DSO
- Example: $100M ÷ $30M = 3.3x
- 365 ÷ 3.3 = 110 days (seems high!)
```

---

## 🔄 PROCESS FLOWS

### **Order-to-Cash (O2C)**
```
1. Order Capture
   ↓ (Customer places order)
2. Order Validation
   ↓ (Credit check, inventory, pricing)
3. Order Fulfillment
   ↓ (Pick, pack, ship)
4. Billing
   ↓ (Create invoice)
5. AR Posting
   ↓ (Post to customer account)
6. Collections
   ↓ (Dunning, reminders, follow-up)
7. Cash Application
   ↓ (Receipt and matching)
8. Reconciliation
   ↓ (GL ↔ subledger verification)

Typical cycle: 45-60 days
Target cycle: 30-35 days
Key metric: DSO
```

### **Procure-to-Pay (P2P)**
```
1. Requisition
   ↓ (Department requests item)
2. Purchase Order
   ↓ (Procurement creates and sends PO)
3. Goods Receipt
   ↓ (Warehouse receives goods, creates GR)
4. Invoice Receipt
   ↓ (Vendor sends invoice)
5. 3-Way Matching
   ↓ (PO vs. GR vs. Invoice comparison)
6. Approval
   ↓ (AP approves for payment)
7. Payment
   ↓ (Check, ACH, or wire sent)
8. Reconciliation
   ↓ (Bank statement matching)

Typical cycle: 30-40 days
Target cycle: <25 days
Key metric: Invoice processing cost, STP rate
```

### **Collections Escalation**
```
Current → 10 Days Late
  ↓ Automated email #1 (friendly reminder)
15 Days Late
  ↓ Automated email #2 (escalated tone)
30 Days Late
  ↓ Personal phone call from collections team
60 Days Late
  ↓ Management escalation
  ↓ Certified letter / formal demand
90+ Days Late
  ↓ Legal action / outside collection agency
  ↓ Consider write-off

Key metric: Collection rate (% collected within 30 days)
Target: 80-90%
```

---

## 💡 ACCOUNTING ENTRIES QUICK REFERENCE

### **Invoice Recognition (O2C)**
```
Dr. Accounts Receivable    $100
   Cr. Revenue                       $100
(Record sale)

Dr. Cost of Goods Sold     $40
   Cr. Inventory                     $40
(Record COGS)
```

### **Payment Receipt (O2C)**
```
Dr. Cash                   $100
   Cr. Accounts Receivable          $100
(Receive payment)
```

### **Invoice Matching (AP)**
```
Initial receipt (before invoice):
Dr. Inventory (or Expense) $100
   Cr. Accounts Payable              $100
(Record purchase)

Invoice received (auto-matched):
Dr. Accounts Payable       $100
   Cr. Cash                          $100
(Pay invoice)
```

### **Early Payment Discount (AP)**
```
Discount taken: 2/10 Net 30
Dr. Accounts Payable       $100
   Cr. Cash                          $98
   Cr. Purchase Discount             $2
(Pay early, take discount)
```

### **Deferred Revenue (SaaS/Subscription)**
```
Invoice for annual subscription:
Dr. Cash                   $1,200
   Cr. Deferred Revenue              $1,200
(Receive annual prepayment)

Monthly revenue recognition:
Dr. Deferred Revenue       $100
   Cr. Revenue                       $100
(Recognize 1/12 each month)
```

---

## 📱 KEYBOARD SHORTCUTS FOR INTERVIEW

### **Searching in AI Assistant**
```
Ctrl + F    = Search within page (browser find)
Ctrl + C    = Copy selected answer to clipboard
Enter       = Execute search in tool
Tab         = Move through form fields
```

### **Common Search Keywords**
```
"DSO"                    → Days Sales Outstanding
"DPO"                    → Days Payable Outstanding
"3-way"                  → 3-way matching explanation
"credit limit"           → Credit management
"collections strategy"   → Collections process
"budget vs forecast"     → Difference and use
"ASC 606"               → Revenue recognition
"STP"                   → Straight-through processing
"CAC"                   → Customer acquisition cost
"LTV"                   → Lifetime value
```

---

## 🎤 INTERVIEW ANSWER FRAMEWORK

### **For Process Questions**
```
1. START: "The process has X main steps..."
2. FLOW: Walk through each step sequentially
3. DETAIL: Key decisions, validations, GL accounts
4. METRIC: How do we measure success? What KPI?
5. SYSTEM: What system records this? What transaction?
6. EXAMPLE: "In my last role..."
7. OPTIMIZE: How would we improve? Any pain points?
```

Example:
```
Q: "Walk me through 3-way matching"
A: "3-way matching has three components:
    (1) PO → Verifies order amount and price
    (2) GR → Confirms goods were received
    (3) Invoice → Vendor's request for payment
   
   System compares all three. If variance >tolerance
   (typically ±2-5%), invoice is blocked pending review.
   
   We measure 3-way match accuracy as a KPI - target
   >95% without manual exception handling.
   
   In SAP, this is configured in tolerance groups (OMRB),
   and matching occurs in MRBR transaction.
   
   In my previous role, we achieved 98% accuracy by
   standardizing our GR process and tightening tolerance
   rules, reducing manual review time by 40%."
```

### **For Metric/KPI Questions**
```
1. DEFINE: What does the metric measure?
2. FORMULA: Show the calculation
3. BENCHMARK: What's typical? What's good?
4. IMPROVE: How do we improve it?
5. TRADE-OFFS: What's the cost of improvement?
6. EXAMPLE: Where have you improved this?
```

Example:
```
Q: "What metrics do you track in AP?"
A: "We track four key metrics:

   (1) Days Payable Outstanding (DPO)
       = (AP ÷ COGS) × 365
       Target: 35-45 days
       Improve by negotiating longer terms
   
   (2) Invoice Processing Cost
       Target: <$3 per invoice (automated)
       Improve with invoice platforms or RPA
   
   (3) 3-way Match Accuracy
       Target: >95%
       Improve by standardizing GR process
   
   (4) On-time Payment %
       Target: 95-98%
       Improve by automation to prevent missed due dates
   
   In my last role, these metrics were reviewed
   monthly and trended in dashboard."
```

### **For "How Would You Improve" Questions**
```
1. LISTEN: Understand current state
2. DIAGNOSE: Ask clarifying questions
   - What's the current metric?
   - What's the root cause?
   - What's been tried?
3. RECOMMEND: Tiered approach
   - QUICK WINS (1-3 months)
   - MEDIUM-TERM (3-6 months)
   - LONG-TERM (6-12 months)
4. QUANTIFY: Show expected impact
5. RISK: What could go wrong? Mitigation?
6. TIMELINE: Be realistic about implementation
```

Example:
```
Q: "How would you reduce DSO from 45 to 35?"
A: "I'd recommend a tiered approach:

   QUICK WINS (Month 1-3):
   1. Invoice at shipment, not delivery (-3-5 days)
   2. Implement automated dunning (-3-5 days)
   3. Add ACH payment option (-2 days)
   4. Personal contact with top 20 customers (-3-5 days)
   Subtotal: 11-20 days improvement
   
   MEDIUM-TERM (Month 3-6):
   5. Offer 1% discount for payment in 10 days (if cash allows)
   6. Standardize invoice format and terms
   7. Process automation (Serrala or similar)
   
   LONG-TERM (Month 6-12):
   8. System upgrade to SAP S/4HANA for real-time analytics
   9. Shift customer mix to higher-quality accounts
   10. Implement advance billing for subscription customers
   
   Expected outcome: 15-20 day reduction (45 → 25-30 days)
   
   Investment: ~$500K for platform + 2 FTE for 6 months
   ROI: If $500M revenue, 15 days improvement = $20M cash freed up"
```

---

## 🏆 FINAL PREP CHECKLIST

### **Day Before Interview**
- [ ] Review O2C and AP Q&A sections (skim for confidence)
- [ ] Prepare 3-5 specific examples with numbers
- [ ] Test AI assistant tool (make sure it loads and searches work)
- [ ] Get 8 hours sleep (clear thinking is critical)
- [ ] Prepare questions to ask interviewer (shows interest)

### **30 Minutes Before Interview**
- [ ] Open AI assistant in separate window/monitor
- [ ] Test search functionality with sample keywords
- [ ] Have markdown Q&A docs open as backup
- [ ] Close unnecessary apps/tabs
- [ ] Deep breathing to reduce nervousness

### **During Interview**
- [ ] Listen carefully to the question
- [ ] Take a moment before answering (shows thoughtfulness)
- [ ] Use STAR method (Situation-Task-Action-Result) for examples
- [ ] Quantify impact (numbers speak louder than descriptions)
- [ ] Ask clarifying questions if needed
- [ ] Reference examples from your experience
- [ ] Use the AI assistant for confidence if you blank on details
- [ ] End with "Do you want me to go deeper on this?"

### **If You Get Stuck**
- [ ] Say "That's a great question, let me think..."
- [ ] Ask the interviewer to clarify
- [ ] Buy time by asking about their situation
- [ ] Search in AI tool while collecting your thoughts
- [ ] Admit if you don't know ("That's not my strong area, but I would...")

---

## 📝 SAMPLE INTERVIEW QUESTIONS

### **Basic Level (You Should Nail These)**
1. "Walk me through the O2C process"
2. "What is DSO and why does it matter?"
3. "Explain 3-way matching"
4. "What are the main steps in collections?"
5. "How is invoicing different for SaaS vs. traditional products?"

### **Intermediate Level (Director Screening)**
1. "How would you reduce DSO from 45 to 30 days?"
2. "Walk me through your P2P process and how you optimized it"
3. "Explain the difference between budget and forecast"
4. "What's your approach to credit management?"
5. "Describe your team structure and KPI dashboard"

### **Advanced Level (Executive Round)**
1. "Tell me about a major transformation project you led in finance operations"
2. "If we're entering a new market, how would you model the financial impact?"
3. "Walk me through an M&A integration from a finance perspective"
4. "What's your vision for modernizing finance operations (RPA, AI, S/4HANA)?"
5. "How do you balance operational efficiency with risk management?"

---

## 🚨 RED FLAGS TO AVOID

### **In Your Answers**
- [ ] Don't say "I'm not sure" without context (okay to say "I'd need to research, but...")
- [ ] Don't claim expertise you don't have (better to be honest)
- [ ] Don't give one-word answers (show your thinking)
- [ ] Don't forget to relate to business impact (not just process)
- [ ] Don't talk too fast (clear communication matters)

### **In Your Preparation**
- [ ] Don't just memorize answers (internalize the concepts)
- [ ] Don't ignore the FP&A section (increasingly important)
- [ ] Don't forget system knowledge (SAP/JDE are asked often)
- [ ] Don't prepare only for one type of role (be flexible)
- [ ] Don't interview with a weak internet connection (AI assistant won't load)

---

**You're Ready! Go Ace That Interview! 💪**
