// Comprehensive Assessment Questions Database for GBS Knowledge Hub

const assessmentQuestions = {
    'r2r-basics': {
        name: 'R2R',
        level: 'Basics',
        description: 'Record-to-Report Fundamentals for Entry-Level Analysts',
        areas: ['GL Account Fundamentals', 'GL Posting & Double-Entry', 'GL Reconciliation', 'Month-End Close', 'Variance Investigation', 'Controls & Compliance', 'GL Reporting'],
        questions: [
            {
                id: 1,
                area: 'GL Account Fundamentals',
                question: 'What is the primary purpose of the General Ledger (GL) in financial accounting?',
                options: [
                    { text: 'To record all financial transactions in a chronological order', isCorrect: false },
                    { text: 'To provide a summary of all accounts and their balances at a specific date', isCorrect: true },
                    { text: 'To track only customer sales transactions', isCorrect: false },
                    { text: 'To manage employee payroll information', isCorrect: false }
                ],
                explanation: 'The GL is the master record containing all accounts with their balances. It serves as the foundation for financial reporting and ensures all debits equal all credits.'
            },
            {
                id: 2,
                area: 'GL Account Fundamentals',
                question: 'Which of the following account types would be found in the GL?',
                options: [
                    { text: 'Assets, Liabilities, Equity, Revenue, Expenses', isCorrect: true },
                    { text: 'Cash, Accounts Receivable, and Inventory only', isCorrect: false },
                    { text: 'Customer names and addresses', isCorrect: false },
                    { text: 'Employee details and salaries', isCorrect: false }
                ],
                explanation: 'The GL contains five main account types: Assets, Liabilities, Equity, Revenue, and Expenses. These form the basis of the accounting equation: Assets = Liabilities + Equity.'
            },
            {
                id: 3,
                area: 'GL Posting & Double-Entry',
                question: 'In double-entry accounting, every transaction must have:',
                options: [
                    { text: 'At least one debit and one credit of equal amounts', isCorrect: true },
                    { text: 'Multiple debits and credits to different accounts', isCorrect: false },
                    { text: 'Only a debit entry', isCorrect: false },
                    { text: 'Only a credit entry to balance accounts', isCorrect: false }
                ],
                explanation: 'Double-entry accounting requires that for every transaction, the total debits must equal the total credits. This maintains the accounting equation balance.'
            },
            {
                id: 4,
                area: 'GL Posting & Double-Entry',
                question: 'When a company receives cash from a customer for a sale, which accounts are affected?',
                options: [
                    { text: 'Debit Cash, Credit Revenue', isCorrect: true },
                    { text: 'Debit Revenue, Credit Accounts Payable', isCorrect: false },
                    { text: 'Debit Expense, Credit Liability', isCorrect: false },
                    { text: 'Debit Liability, Credit Revenue', isCorrect: false }
                ],
                explanation: 'Cash is debited (increases an asset) and Revenue is credited (increases revenue). This represents the inflow of cash from customer sales.'
            },
            {
                id: 5,
                area: 'GL Reconciliation',
                question: 'What is the primary objective of GL reconciliation?',
                options: [
                    { text: 'To ensure all GL accounts match subsidiary ledgers and external data', isCorrect: true },
                    { text: 'To identify and correct errors in the financial statements', isCorrect: false },
                    { text: 'To delete old transactions from the GL', isCorrect: false },
                    { text: 'To verify employee expense reports', isCorrect: false }
                ],
                explanation: 'GL reconciliation ensures that GL account balances agree with supporting documentation, subsidiary ledgers, and bank statements. It verifies accuracy and completeness of recorded transactions.'
            },
            {
                id: 6,
                area: 'GL Reconciliation',
                question: 'Which of the following is a common reconciling item between the bank statement and the GL Cash account?',
                options: [
                    { text: 'Outstanding checks and deposits in transit', isCorrect: true },
                    { text: 'Employee salary payments', isCorrect: false },
                    { text: 'Customer invoice amounts', isCorrect: false },
                    { text: 'Product inventory counts', isCorrect: false }
                ],
                explanation: 'Outstanding checks (written but not yet cleared) and deposits in transit (recorded but not yet deposited) are timing differences that require reconciliation between bank and GL records.'
            },
            {
                id: 7,
                area: 'Month-End Close',
                question: 'What is the primary purpose of the month-end close process?',
                options: [
                    { text: 'To ensure financial records are complete, accurate, and ready for reporting', isCorrect: true },
                    { text: 'To delete all old transactions from the system', isCorrect: false },
                    { text: 'To prevent new transactions from being recorded', isCorrect: false },
                    { text: 'To calculate employee bonuses', isCorrect: false }
                ],
                explanation: 'Month-end close ensures all transactions are recorded, reconciled, and verified so accurate financial statements can be prepared. It includes accruals, deferrals, and reconciliations.'
            },
            {
                id: 8,
                area: 'Month-End Close',
                question: 'Which of the following is typically part of the month-end close checklist?',
                options: [
                    { text: 'Accrual entries, reconciliations, journal entries review, and GL balance verification', isCorrect: true },
                    { text: 'Hiring new employees and calculating their pay', isCorrect: false },
                    { text: 'Shipping products to customers', isCorrect: false },
                    { text: 'Organizing office supplies', isCorrect: false }
                ],
                explanation: 'Month-end close includes recording accruals/deferrals, reconciling accounts, reviewing journal entries, verifying GL balances, and preparing trial balance and financial statements.'
            },
            {
                id: 9,
                area: 'Variance Investigation',
                question: 'What is a variance in the context of financial reporting?',
                options: [
                    { text: 'The difference between actual results and budgeted or forecasted amounts', isCorrect: true },
                    { text: 'The total amount of revenue for the period', isCorrect: false },
                    { text: 'The list of all GL accounts', isCorrect: false },
                    { text: 'The employee time off requests', isCorrect: false }
                ],
                explanation: 'A variance is the numerical difference between planned (budgeted) and actual amounts. Favorable variances indicate better-than-expected results; unfavorable indicates worse results.'
            },
            {
                id: 10,
                area: 'Variance Investigation',
                question: 'When investigating a variance, what should be your first step?',
                options: [
                    { text: 'Identify the root cause by comparing actuals to budget and analyzing supporting data', isCorrect: true },
                    { text: 'Immediately change next month\'s budget to match actuals', isCorrect: false },
                    { text: 'Ignore the variance if it\'s less than 5%', isCorrect: false },
                    { text: 'Report it to the executive team without analysis', isCorrect: false }
                ],
                explanation: 'Investigating variances involves identifying reasons for differences (volume, price, timing, one-time items) and documenting them for management review and decision-making.'
            },
            {
                id: 11,
                area: 'Controls & Compliance',
                question: 'What is the purpose of internal controls in the GL process?',
                options: [
                    { text: 'To prevent, detect, and correct errors and fraud in financial records', isCorrect: true },
                    { text: 'To increase the number of transactions processed', isCorrect: false },
                    { text: 'To allow employees to bypass approval processes', isCorrect: false },
                    { text: 'To eliminate the need for reconciliations', isCorrect: false }
                ],
                explanation: 'Internal controls are policies and procedures that safeguard assets, ensure accurate financial reporting, and promote operational efficiency and compliance with regulations.'
            },
            {
                id: 12,
                area: 'Controls & Compliance',
                question: 'Which control activity is most important for preventing unauthorized GL transactions?',
                options: [
                    { text: 'Segregation of duties (different people to authorize, record, and reconcile)', isCorrect: true },
                    { text: 'Using the same password for all employees', isCorrect: false },
                    { text: 'Recording all transactions without approval', isCorrect: false },
                    { text: 'Deleting old transaction records monthly', isCorrect: false }
                ],
                explanation: 'Segregation of duties ensures no single employee can initiate, approve, record, and reconcile a transaction, reducing fraud risk and ensuring accuracy.'
            },
            {
                id: 13,
                area: 'GL Reporting',
                question: 'What is the Trial Balance used for?',
                options: [
                    { text: 'To verify that total debits equal total credits before preparing financial statements', isCorrect: true },
                    { text: 'To list customer names and addresses', isCorrect: false },
                    { text: 'To track employee work hours', isCorrect: false },
                    { text: 'To manage inventory levels', isCorrect: false }
                ],
                explanation: 'A Trial Balance is a summary of all GL accounts showing debits and credits. If debits don\'t equal credits, it indicates recording errors that must be corrected.'
            },
            {
                id: 14,
                area: 'GL Reporting',
                question: 'Which of the following is typically included in standard GL reports?',
                options: [
                    { text: 'Account balances, period activity, comparisons to prior periods, and variance analysis', isCorrect: true },
                    { text: 'Employee vacation schedules', isCorrect: false },
                    { text: 'Customer satisfaction surveys', isCorrect: false },
                    { text: 'Inventory shelf locations', isCorrect: false }
                ],
                explanation: 'GL reports provide visibility into account activity, current balances, trends, and variances from expectations, enabling management to assess financial performance.'
            },
            {
                id: 15,
                area: 'Month-End Close',
                question: 'Why are accrual entries important during month-end close?',
                options: [
                    { text: 'To record revenue and expenses in the correct period, regardless of cash flow timing', isCorrect: true },
                    { text: 'To record cash payments only', isCorrect: false },
                    { text: 'To eliminate all liabilities from the balance sheet', isCorrect: false },
                    { text: 'To increase cash in the GL', isCorrect: false }
                ],
                explanation: 'Accrual accounting requires recording transactions when they occur (revenue earned, expenses incurred) regardless of when cash is received or paid, ensuring accurate period financial statements.'
            },
            {
                id: 16,
                area: 'GL Account Fundamentals',
                question: 'What is the difference between a Debit and a Credit in the GL?',
                options: [
                    { text: 'Debits increase assets/expenses; credits increase liabilities/equity/revenue', isCorrect: true },
                    { text: 'Debits always decrease accounts; credits always increase accounts', isCorrect: false },
                    { text: 'Debits are used for customer payments only', isCorrect: false },
                    { text: 'Credits represent loans from banks', isCorrect: false }
                ],
                explanation: 'Debits and credits are directional entries. For assets and expenses, debit increases; for liabilities, equity, and revenue, credit increases. This maintains the accounting equation.'
            },
            {
                id: 17,
                area: 'Variance Investigation',
                question: 'If actual revenue is significantly higher than budgeted revenue, what types of factors should be investigated?',
                options: [
                    { text: 'Volume changes (more units sold), price changes, new customer acquisitions, or product mix shifts', isCorrect: true },
                    { text: 'Only historical budget data', isCorrect: false },
                    { text: 'Employee performance reviews only', isCorrect: false },
                    { text: 'Competitor financial statements', isCorrect: false }
                ],
                explanation: 'Investigating favorable revenue variances involves analyzing what drove the outperformance: increased sales volume, higher prices realized, new markets, or product mix changes.'
            },
            {
                id: 18,
                area: 'GL Reconciliation',
                question: 'What should you do if a GL reconciliation doesn\'t balance?',
                options: [
                    { text: 'Investigate the variance, identify the root cause, document findings, and make corrective entries', isCorrect: true },
                    { text: 'Adjust the GL balance to match the external data without investigation', isCorrect: false },
                    { text: 'Ignore small differences and only address large variances', isCorrect: false },
                    { text: 'Delete old transactions to force a balance', isCorrect: false }
                ],
                explanation: 'When reconciliations don\'t balance, thorough investigation is required to identify errors (posting errors, duplicate entries, missing transactions) before making corrections.'
            }
        ]
    },
    'o2c-basics': {
        name: 'O2C',
        level: 'Basics',
        description: 'Order-to-Cash Fundamentals for Entry-Level Professionals',
        areas: ['Sales Order Management', 'Pricing & Discounts', 'Billing & Invoicing', 'Collections Process', 'AR Reconciliation', 'Dispute Resolution', 'O2C Reporting'],
        questions: [
            {
                id: 1,
                area: 'Sales Order Management',
                question: 'What is the primary purpose of the Sales Order in the O2C process?',
                options: [
                    { text: 'To authorize the sale, document customer requirements, and trigger fulfillment', isCorrect: true },
                    { text: 'To track employee work hours', isCorrect: false },
                    { text: 'To manage inventory warehouse locations', isCorrect: false },
                    { text: 'To calculate employee commissions', isCorrect: false }
                ],
                explanation: 'A Sales Order documents the customer\'s request for goods/services, including quantities, prices, and delivery terms. It authorizes production/fulfillment and serves as input to invoicing.'
            },
            {
                id: 2,
                area: 'Sales Order Management',
                question: 'What critical validations should occur when a sales order is created?',
                options: [
                    { text: 'Customer credit status, product availability, pricing accuracy, and shipping address validity', isCorrect: true },
                    { text: 'Only the order date', isCorrect: false },
                    { text: 'Customer email address only', isCorrect: false },
                    { text: 'Employee names in the sales team', isCorrect: false }
                ],
                explanation: 'Key validations prevent errors downstream: credit holds prevent bad debt, inventory checks avoid backorders, pricing ensures revenue accuracy, and address validation enables successful delivery.'
            },
            {
                id: 3,
                area: 'Pricing & Discounts',
                question: 'What should be considered when applying discounts to a customer order?',
                options: [
                    { text: 'Discount eligibility rules, customer contract terms, volume thresholds, and approval limits', isCorrect: true },
                    { text: 'Giving maximum discounts to all customers equally', isCorrect: false },
                    { text: 'Ignoring discount policies to close sales quickly', isCorrect: false },
                    { text: 'Using different discount rates for identical orders', isCorrect: false }
                ],
                explanation: 'Discount administration requires consistent application of defined rules to maintain margin targets, comply with customer contracts, and ensure fair treatment across customers.'
            },
            {
                id: 4,
                area: 'Pricing & Discounts',
                question: 'What is the difference between a trade discount and a quantity discount?',
                options: [
                    { text: 'Trade discount is based on customer category/relationship; quantity discount is based on order volume', isCorrect: true },
                    { text: 'Both terms mean the same thing', isCorrect: false },
                    { text: 'Trade discount is temporary; quantity discount is permanent', isCorrect: false },
                    { text: 'Quantity discount applies only to new customers', isCorrect: false }
                ],
                explanation: 'Trade discounts (wholesale, distribution, loyalty discounts) depend on customer relationship. Quantity discounts increase for larger order volumes, incentivizing bigger purchases.'
            },
            {
                id: 5,
                area: 'Billing & Invoicing',
                question: 'When should an invoice be issued in the O2C process?',
                options: [
                    { text: 'Upon shipment or service delivery completion, when all order requirements are fulfilled', isCorrect: true },
                    { text: 'Immediately when the order is received, before fulfillment', isCorrect: false },
                    { text: 'Only once the customer has paid', isCorrect: false },
                    { text: 'At the end of each month regardless of delivery status', isCorrect: false }
                ],
                explanation: 'Invoicing is triggered by actual delivery/completion to ensure revenue recognition is accurate. Invoicing before delivery risks incorrect accounting and revenue recognition violations.'
            },
            {
                id: 6,
                area: 'Billing & Invoicing',
                question: 'What key information must appear on a valid invoice?',
                options: [
                    { text: 'Invoice number, date, customer details, itemized products/services with quantities and prices, total amount due, and payment terms', isCorrect: true },
                    { text: 'Only the order number and customer name', isCorrect: false },
                    { text: 'Just the total amount owed', isCorrect: false },
                    { text: 'Employee names and contact information', isCorrect: false }
                ],
                explanation: 'Complete invoices enable proper recording in accounting systems, facilitate customer payment, and provide audit trails. Missing details can cause payment delays and reconciliation issues.'
            },
            {
                id: 7,
                area: 'Collections Process',
                question: 'What is the primary objective of the collections process?',
                options: [
                    { text: 'To secure payment from customers for invoiced amounts within agreed terms', isCorrect: true },
                    { text: 'To accumulate customer mailing addresses', isCorrect: false },
                    { text: 'To discourage customers from making purchases', isCorrect: false },
                    { text: 'To eliminate all credit sales', isCorrect: false }
                ],
                explanation: 'Collections ensures timely payment of customer invoices, minimizes Days Sales Outstanding (DSO), reduces bad debt risk, and improves cash flow.'
            },
            {
                id: 8,
                area: 'Collections Process',
                question: 'What are typical steps in a collections workflow for overdue invoices?',
                options: [
                    { text: 'Payment reminder, escalation follow-ups, hold on future orders, and eventual write-off if uncollectible', isCorrect: true },
                    { text: 'Immediate legal action without communication', isCorrect: false },
                    { text: 'Canceling the customer account immediately', isCorrect: false },
                    { text: 'Accepting the loss without investigation', isCorrect: false }
                ],
                explanation: 'Professional collections follows a progressive approach: reminders, direct contact, escalation, credit holds, and only after all efforts, write-off of accounts deemed uncollectible.'
            },
            {
                id: 9,
                area: 'AR Reconciliation',
                question: 'What is the purpose of Accounts Receivable (AR) reconciliation?',
                options: [
                    { text: 'To verify AR sub-ledger balances agree with GL AR account and identify discrepancies', isCorrect: true },
                    { text: 'To delete old customer records', isCorrect: false },
                    { text: 'To prevent customers from viewing their account balances', isCorrect: false },
                    { text: 'To adjust prices for all active orders', isCorrect: false }
                ],
                explanation: 'AR reconciliation ensures the detail ledger (individual customer accounts) matches the summary GL account, identifying posting errors, timing differences, or missing transactions.'
            },
            {
                id: 10,
                area: 'AR Reconciliation',
                question: 'What common AR reconciling items might explain differences between sub-ledger and GL?',
                options: [
                    { text: 'Unposted invoices, unapplied payments, credit memos, and timing of transactions between systems', isCorrect: true },
                    { text: 'Customer names spelled differently', isCorrect: false },
                    { text: 'Employee vacation dates', isCorrect: false },
                    { text: 'Competitor pricing information', isCorrect: false }
                ],
                explanation: 'Common AR differences include invoices recorded in GL but not yet in customer statements, payments applied incorrectly, or credit memos processed in different periods across systems.'
            },
            {
                id: 11,
                area: 'Dispute Resolution',
                question: 'When a customer disputes an invoice amount, what should be your first action?',
                options: [
                    { text: 'Review the original sales order, delivery documents, and invoice to understand the basis of the dispute', isCorrect: true },
                    { text: 'Automatically issue a credit memo', isCorrect: false },
                    { text: 'Refuse to engage with the customer', isCorrect: false },
                    { text: 'Demand immediate payment while investigating', isCorrect: false }
                ],
                explanation: 'Professional dispute resolution begins with fact gathering: verifying what was ordered, what was delivered, what was invoiced, and identifying any legitimate discrepancies.'
            },
            {
                id: 12,
                area: 'Dispute Resolution',
                question: 'What are common reasons for customer invoice disputes?',
                options: [
                    { text: 'Price discrepancies, quantity mismatches, duplicate invoices, damaged goods, or pricing agreement violations', isCorrect: true },
                    { text: 'Only because customers want to avoid payment', isCorrect: false },
                    { text: 'Weather conditions affecting shipment', isCorrect: false },
                    { text: 'Your company\'s internal problems', isCorrect: false }
                ],
                explanation: 'Valid disputes often stem from legitimate business issues: pricing errors, short shipments, quality problems, or unclear terms. Resolving them maintains customer relationships and cash flow.'
            },
            {
                id: 13,
                area: 'O2C Reporting',
                question: 'What metrics are typically tracked in O2C reporting?',
                options: [
                    { text: 'Days Sales Outstanding (DSO), order cycle time, invoice accuracy, collection rates, and cash realization', isCorrect: true },
                    { text: 'Only the total number of orders received', isCorrect: false },
                    { text: 'Employee attendance records', isCorrect: false },
                    { text: 'Company stock price', isCorrect: false }
                ],
                explanation: 'O2C metrics measure efficiency (order cycle time), quality (invoice accuracy), and financial impact (DSO, cash realization), enabling management to identify improvement opportunities.'
            },
            {
                id: 14,
                area: 'O2C Reporting',
                question: 'What does Days Sales Outstanding (DSO) measure?',
                options: [
                    { text: 'The average number of days it takes a company to collect cash after an invoice is issued', isCorrect: true },
                    { text: 'The number of days inventory sits in the warehouse', isCorrect: false },
                    { text: 'The number of days an employee works per week', isCorrect: false },
                    { text: 'The number of days a product is on sale', isCorrect: false }
                ],
                explanation: 'DSO = (Average AR / Daily Revenue). Lower DSO indicates faster collections and better cash flow. Industry benchmarks help assess performance.'
            },
            {
                id: 15,
                area: 'Sales Order Management',
                question: 'What is a "Hold" on a customer order and when should it be applied?',
                options: [
                    { text: 'A temporary suspension of order processing due to credit, compliance, or delivery issues that must be resolved first', isCorrect: true },
                    { text: 'A permanent cancellation of all future orders', isCorrect: false },
                    { text: 'A routine delay with no specific reason', isCorrect: false },
                    { text: 'A request to increase the order quantity', isCorrect: false }
                ],
                explanation: 'Holds protect the company: credit holds prevent shipping to at-risk customers, compliance holds ensure regulatory requirements, and delivery holds address logistics issues.'
            },
            {
                id: 16,
                area: 'Pricing & Discounts',
                question: 'Why is discount governance important in the O2C process?',
                options: [
                    { text: 'To ensure consistent application of discount policies, maintain margin targets, and prevent unauthorized discounting', isCorrect: true },
                    { text: 'To eliminate all discounts from pricing', isCorrect: false },
                    { text: 'To allow each salesperson to set their own discount rates', isCorrect: false },
                    { text: 'To make products more expensive', isCorrect: false }
                ],
                explanation: 'Discount controls ensure profitability: policies define who can grant discounts, in what situations, and for how much. This prevents margin erosion and maintains fairness.'
            },
            {
                id: 17,
                area: 'Collections Process',
                question: 'What is "Bad Debt" and how does it affect the company?',
                options: [
                    { text: 'Invoices that a customer is unable or unwilling to pay, reducing company revenue and requiring write-off', isCorrect: true },
                    { text: 'A discount given to loyal customers', isCorrect: false },
                    { text: 'Late delivery charges', isCorrect: false },
                    { text: 'Customer shipping addresses', isCorrect: false }
                ],
                explanation: 'Bad debt is uncollectible amounts that reduce net revenue. Bad Debt Expense is recorded on the Income Statement; Allowance for Doubtful Accounts reduces AR on the Balance Sheet.'
            },
            {
                id: 18,
                area: 'Billing & Invoicing',
                question: 'What is a credit memo and when is it typically issued?',
                options: [
                    { text: 'A document reducing an invoice amount due to returns, damaged goods, pricing adjustments, or other credits', isCorrect: true },
                    { text: 'An invoice for future services', isCorrect: false },
                    { text: 'A guarantee of payment from the customer', isCorrect: false },
                    { text: 'A request to extend payment terms', isCorrect: false }
                ],
                explanation: 'Credit memos reduce customer obligations. They must be properly documented, approved, and recorded in AR to ensure accurate aging and collections tracking.'
            }
        ]
    },
    'fpa-basics': {
        name: 'FP&A',
        level: 'Basics',
        description: 'Financial Planning & Analysis Fundamentals for Entry-Level Analysts',
        areas: ['Budget Development', 'Financial Modeling', 'Variance Analysis', 'KPI Development', 'Forecasting', 'Data Analysis', 'Reporting & Dashboards'],
        questions: [
            {
                id: 1,
                area: 'Budget Development',
                question: 'What is the primary purpose of a financial budget?',
                options: [
                    { text: 'To establish financial targets and provide a framework for measuring performance against plans', isCorrect: true },
                    { text: 'To record all historical transactions', isCorrect: false },
                    { text: 'To replace the need for actual financial statements', isCorrect: false },
                    { text: 'To prevent any business changes during the year', isCorrect: false }
                ],
                explanation: 'A budget quantifies strategic plans in financial terms, guiding resource allocation and providing benchmarks to assess actual performance and identify variances.'
            },
            {
                id: 2,
                area: 'Budget Development',
                question: 'What are the main types of budgets typically prepared?',
                options: [
                    { text: 'Operating (revenue, expenses), Capital (asset investments), and Cash Flow budgets', isCorrect: true },
                    { text: 'Only revenue budgets', isCorrect: false },
                    { text: 'Customer service budgets', isCorrect: false },
                    { text: 'Holiday schedules', isCorrect: false }
                ],
                explanation: 'Operating budgets cover day-to-day activities (P&L), capital budgets cover asset purchases, and cash flow budgets forecast cash inflows/outflows.'
            },
            {
                id: 3,
                area: 'Financial Modeling',
                question: 'What is a financial model used for?',
                options: [
                    { text: 'To project future financial results based on assumptions and historical data', isCorrect: true },
                    { text: 'To record past transactions', isCorrect: false },
                    { text: 'To eliminate financial analysis needs', isCorrect: false },
                    { text: 'To replace auditors', isCorrect: false }
                ],
                explanation: 'Financial models use historical data, industry trends, and management assumptions to forecast revenues, expenses, cash flows, and financial position for strategic decision-making.'
            },
            {
                id: 4,
                area: 'Financial Modeling',
                question: 'What are key components of a financial model?',
                options: [
                    { text: 'Assumptions, input drivers, calculation logic, and output statements (P&L, Balance Sheet, Cash Flow)', isCorrect: true },
                    { text: 'Only cost estimates', isCorrect: false },
                    { text: 'Just employee names and titles', isCorrect: false },
                    { text: 'Customer feedback only', isCorrect: false }
                ],
                explanation: 'Effective models document assumptions clearly, link outputs to inputs logically, and produce three integrated financial statements enabling scenario analysis.'
            },
            {
                id: 5,
                area: 'Variance Analysis',
                question: 'What is the goal of variance analysis?',
                options: [
                    { text: 'To understand why actual results differ from budget and identify business drivers or issues', isCorrect: true },
                    { text: 'To prove the budget was correct', isCorrect: false },
                    { text: 'To blame departments for missing targets', isCorrect: false },
                    { text: 'To eliminate forecasting', isCorrect: false }
                ],
                explanation: 'Variance analysis investigates the "why" behind differences, uncovering volume changes, pricing impacts, cost drivers, or external factors affecting results.'
            },
            {
                id: 6,
                area: 'Variance Analysis',
                question: 'What is a common approach to breaking down a revenue variance?',
                options: [
                    { text: 'Volume variance (units sold vs. budget) and price variance (actual price vs. budgeted price)', isCorrect: true },
                    { text: 'Only total revenue comparison', isCorrect: false },
                    { text: 'Employee performance metrics', isCorrect: false },
                    { text: 'Historical revenue only', isCorrect: false }
                ],
                explanation: 'Revenue variance is typically decomposed into volume (quantity) and price (rate) components, allowing management to identify which factor drove performance.'
            },
            {
                id: 7,
                area: 'KPI Development',
                question: 'What is a Key Performance Indicator (KPI)?',
                options: [
                    { text: 'A measurable value that indicates how effectively a business is achieving key objectives', isCorrect: true },
                    { text: 'A list of employees and their salaries', isCorrect: false },
                    { text: 'A competitor\'s financial results', isCorrect: false },
                    { text: 'The number of products in inventory', isCorrect: false }
                ],
                explanation: 'KPIs are quantifiable metrics tied to strategic goals, enabling management to monitor progress and make data-driven decisions (e.g., margin %, revenue growth %, ROI).'
            },
            {
                id: 8,
                area: 'KPI Development',
                question: 'What characteristics should a well-designed KPI have?',
                options: [
                    { text: 'Specific and measurable, tied to business objectives, relevant to stakeholders, and trackable over time', isCorrect: true },
                    { text: 'Vague and subjective', isCorrect: false },
                    { text: 'Unrelated to business strategy', isCorrect: false },
                    { text: 'Impossible to measure', isCorrect: false }
                ],
                explanation: 'Effective KPIs are SMART (Specific, Measurable, Achievable, Relevant, Time-bound), aligned with strategy, and communicate clear expectations.'
            },
            {
                id: 9,
                area: 'Forecasting',
                question: 'What is the difference between a budget and a forecast?',
                options: [
                    { text: 'Budget is the annual plan; forecast is a revised projection based on updated actual results during the year', isCorrect: true },
                    { text: 'They mean the same thing', isCorrect: false },
                    { text: 'Forecast is only for revenue', isCorrect: false },
                    { text: 'Budget is never revised', isCorrect: false }
                ],
                explanation: 'Budgets are set at year-start; forecasts are rolling projections updated regularly (monthly/quarterly) to reflect changing business conditions and actual results.'
            },
            {
                id: 10,
                area: 'Forecasting',
                question: 'What methods are commonly used for financial forecasting?',
                options: [
                    { text: 'Time series analysis (historical trends), regression analysis, management judgment, and industry benchmarks', isCorrect: true },
                    { text: 'Random guessing', isCorrect: false },
                    { text: 'Only competitor data', isCorrect: false },
                    { text: 'Employee opinions without data', isCorrect: false }
                ],
                explanation: 'Effective forecasting combines quantitative methods (trends, regressions), qualitative inputs (expert judgment), and external data (industry trends, market conditions).'
            },
            {
                id: 11,
                area: 'Data Analysis',
                question: 'What is the purpose of conducting data analysis in FP&A?',
                options: [
                    { text: 'To identify trends, patterns, and insights that support strategic decision-making and improve forecasts', isCorrect: true },
                    { text: 'To complicate financial reporting', isCorrect: false },
                    { text: 'To eliminate the need for analysis', isCorrect: false },
                    { text: 'To make data less useful', isCorrect: false }
                ],
                explanation: 'FP&A analytics uncover relationships between variables, identify emerging trends, validate assumptions, and provide evidence for strategic recommendations.'
            },
            {
                id: 12,
                area: 'Data Analysis',
                question: 'What tools are commonly used for financial data analysis?',
                options: [
                    { text: 'Spreadsheets (Excel), Business Intelligence tools (Tableau, Power BI), and financial planning software (Anaplan, Taboola)', isCorrect: true },
                    { text: 'Only pencil and paper', isCorrect: false },
                    { text: 'Email only', isCorrect: false },
                    { text: 'No tools, just memory', isCorrect: false }
                ],
                explanation: 'Modern FP&A leverages technology for data aggregation, visualization, and analysis, enabling faster insights and more sophisticated modeling.'
            },
            {
                id: 13,
                area: 'Reporting & Dashboards',
                question: 'What information should be included in an executive FP&A report?',
                options: [
                    { text: 'Key metrics, actual vs. budget comparison, significant variances, trends, and forward-looking insights', isCorrect: true },
                    { text: 'Only historical data from five years ago', isCorrect: false },
                    { text: 'Employee attendance records', isCorrect: false },
                    { text: 'Unrelated company gossip', isCorrect: false }
                ],
                explanation: 'Executive reports focus on critical information: how business is performing against plan, what drove variances, and what trends to watch.'
            },
            {
                id: 14,
                area: 'Reporting & Dashboards',
                question: 'What is the value of a financial dashboard?',
                options: [
                    { text: 'To visualize key metrics in real-time, enabling quick identification of performance issues and opportunities', isCorrect: true },
                    { text: 'To hide financial performance', isCorrect: false },
                    { text: 'To replace all financial analysis', isCorrect: false },
                    { text: 'To make data harder to understand', isCorrect: false }
                ],
                explanation: 'Dashboards provide at-a-glance visibility into KPIs, trends, and exceptions, facilitating faster decision-making and performance management.'
            },
            {
                id: 15,
                area: 'Budget Development',
                question: 'What is "Zero-Based Budgeting" and how does it differ from traditional budgeting?',
                options: [
                    { text: 'ZBB requires justifying all expenses from zero, not assuming prior year as baseline', isCorrect: true },
                    { text: 'It\'s the same as traditional budgeting', isCorrect: false },
                    { text: 'ZBB always results in lower budgets', isCorrect: false },
                    { text: 'It eliminates the need for financial analysis', isCorrect: false }
                ],
                explanation: 'ZBB scrutinizes every expense for necessity and efficiency, not assuming "we did this last year, so we need it again." This can reveal waste but requires more effort.'
            },
            {
                id: 16,
                area: 'Variance Analysis',
                question: 'Why is timely variance analysis important?',
                options: [
                    { text: 'To enable management to take corrective action quickly if business is off track', isCorrect: true },
                    { text: 'To delay decision-making', isCorrect: false },
                    { text: 'To hide problems from management', isCorrect: false },
                    { text: 'To prevent any changes to the plan', isCorrect: false }
                ],
                explanation: 'Early variance identification enables quicker corrective actions: cost reductions, sales initiatives, or forecast updates to minimize negative impact.'
            },
            {
                id: 17,
                area: 'Financial Modeling',
                question: 'What is "Sensitivity Analysis" in financial modeling?',
                options: [
                    { text: 'Testing how changes in key assumptions affect financial outcomes to understand risk and upside potential', isCorrect: true },
                    { text: 'Ignoring potential changes in the business', isCorrect: false },
                    { text: 'Only considering one scenario', isCorrect: false },
                    { text: 'Refusing to update models', isCorrect: false }
                ],
                explanation: 'Sensitivity analysis (also called "what-if analysis") shows which variables have the biggest impact on results, helping prioritize management focus and risk mitigation.'
            },
            {
                id: 18,
                area: 'Forecasting',
                question: 'What are common causes of forecast errors?',
                options: [
                    { text: 'Inaccurate assumptions, unexpected market changes, unforeseen events, and changes in business strategy', isCorrect: true },
                    { text: 'Forecasts are always perfectly accurate', isCorrect: false },
                    { text: 'Only human error', isCorrect: false },
                    { text: 'Weather only', isCorrect: false }
                ],
                explanation: 'Forecast accuracy improves through regular updates, contingency planning for identified risks, and learning from past forecast errors.'
            }
        ]
    },
    'ops-basics': {
        name: 'Operations',
        level: 'Basics',
        description: 'Finance Operations Fundamentals for Entry-Level Professionals',
        areas: ['Process Design', 'Systems & Technology', 'SOP Documentation', 'Quality Assurance', 'Metrics & Analytics', 'Compliance & Controls', 'Continuous Improvement', 'Team Management'],
        questions: [
            {
                id: 1,
                area: 'Process Design',
                question: 'What is the primary goal of process design in finance operations?',
                options: [
                    { text: 'To create standardized, efficient workflows that minimize errors, reduce costs, and improve speed', isCorrect: true },
                    { text: 'To make processes more complicated', isCorrect: false },
                    { text: 'To eliminate all automation', isCorrect: false },
                    { text: 'To increase manual work', isCorrect: false }
                ],
                explanation: 'Process design maps workflows, identifies bottlenecks, eliminates waste, and optimizes resource utilization to improve efficiency and quality.'
            },
            {
                id: 2,
                area: 'Process Design',
                question: 'What is a Process Map and why is it important?',
                options: [
                    { text: 'A visual representation of process steps showing inputs, activities, decisions, and outputs', isCorrect: true },
                    { text: 'A map to the company office locations', isCorrect: false },
                    { text: 'A list of employee names', isCorrect: false },
                    { text: 'A schedule for time off', isCorrect: false }
                ],
                explanation: 'Process maps enable stakeholders to understand workflows, identify inefficiencies, document procedures, and support training of new employees.'
            },
            {
                id: 3,
                area: 'Systems & Technology',
                question: 'What is the role of technology in finance operations?',
                options: [
                    { text: 'To automate routine tasks, improve accuracy, enable real-time reporting, and free time for analysis', isCorrect: true },
                    { text: 'To replace all human employees', isCorrect: false },
                    { text: 'To make work harder', isCorrect: false },
                    { text: 'To eliminate financial records', isCorrect: false }
                ],
                explanation: 'Finance systems (ERP, accounting software) automate transaction processing, reconciliations, and reporting, increasing speed and reducing manual errors.'
            },
            {
                id: 4,
                area: 'Systems & Technology',
                question: 'What are common finance systems used in operations?',
                options: [
                    { text: 'ERP systems (SAP, Oracle), General Ledger systems, and specialized tools (RPA, data analytics)', isCorrect: true },
                    { text: 'Only pen and paper', isCorrect: false },
                    { text: 'Social media platforms', isCorrect: false },
                    { text: 'Video games', isCorrect: false }
                ],
                explanation: 'Enterprise Resource Planning systems integrate financial and operational data, automating processes and providing comprehensive visibility across functions.'
            },
            {
                id: 5,
                area: 'SOP Documentation',
                question: 'What is a Standard Operating Procedure (SOP)?',
                options: [
                    { text: 'A detailed written guide documenting step-by-step how to perform a process consistently', isCorrect: true },
                    { text: 'A salary schedule', isCorrect: false },
                    { text: 'A customer list', isCorrect: false },
                    { text: 'A marketing plan', isCorrect: false }
                ],
                explanation: 'SOPs standardize processes, ensure consistency across employees and time periods, facilitate training, and serve as audit documentation.'
            },
            {
                id: 6,
                area: 'SOP Documentation',
                question: 'What should an effective SOP include?',
                options: [
                    { text: 'Process overview, step-by-step instructions, decision points, system navigation, exception handling, and approval/escalation paths', isCorrect: true },
                    { text: 'Only the final result', isCorrect: false },
                    { text: 'Employee personal information', isCorrect: false },
                    { text: 'Irrelevant historical facts', isCorrect: false }
                ],
                explanation: 'Comprehensive SOPs enable anyone to execute the process correctly, reducing dependency on specific individuals and improving operational resilience.'
            },
            {
                id: 7,
                area: 'Quality Assurance',
                question: 'What is the purpose of Quality Assurance (QA) in finance operations?',
                options: [
                    { text: 'To verify that processes are executed correctly and outputs meet defined standards', isCorrect: true },
                    { text: 'To blame employees for errors', isCorrect: false },
                    { text: 'To slow down all processes', isCorrect: false },
                    { text: 'To eliminate accountability', isCorrect: false }
                ],
                explanation: 'QA reviews catch errors before they impact business or customers, identify process improvement opportunities, and ensure compliance with policies.'
            },
            {
                id: 8,
                area: 'Quality Assurance',
                question: 'What are common QA activities in finance operations?',
                options: [
                    { text: 'Sample testing, reconciliation verification, transaction validation, and review of completeness and accuracy', isCorrect: true },
                    { text: 'Never checking anyone\'s work', isCorrect: false },
                    { text: 'Only reviewing very old transactions', isCorrect: false },
                    { text: 'Ignoring customer complaints', isCorrect: false }
                ],
                explanation: 'QA employs statistical sampling to verify accuracy, spot testing of processes, and trend analysis to identify systemic issues.'
            },
            {
                id: 9,
                area: 'Metrics & Analytics',
                question: 'Why are operational metrics important?',
                options: [
                    { text: 'To measure process efficiency, quality, and performance, enabling data-driven improvement decisions', isCorrect: true },
                    { text: 'To confuse employees', isCorrect: false },
                    { text: 'To avoid measuring performance', isCorrect: false },
                    { text: 'To eliminate accountability', isCorrect: false }
                ],
                explanation: 'Metrics like cycle time, error rate, cost per transaction, and throughput provide visibility into operations performance and highlight improvement priorities.'
            },
            {
                id: 10,
                area: 'Metrics & Analytics',
                question: 'What are examples of Finance Operations metrics?',
                options: [
                    { text: 'Invoice cycle time, error rate, cost per invoice, first-time accuracy, and Days Sales Outstanding', isCorrect: true },
                    { text: 'Only revenue numbers', isCorrect: false },
                    { text: 'Employee salaries only', isCorrect: false },
                    { text: 'Customer satisfaction surveys alone', isCorrect: false }
                ],
                explanation: 'Operations metrics focus on process-level performance: how fast, how accurate, how costly. These drive improvement initiatives and efficiency gains.'
            },
            {
                id: 11,
                area: 'Compliance & Controls',
                question: 'What is the role of controls in finance operations?',
                options: [
                    { text: 'To prevent errors and fraud, ensure regulatory compliance, and safeguard company assets', isCorrect: true },
                    { text: 'To prevent people from working efficiently', isCorrect: false },
                    { text: 'To eliminate accountability', isCorrect: false },
                    { text: 'To make processes unnecessarily complicated', isCorrect: false }
                ],
                explanation: 'Controls reduce risk by requiring approvals, segregation of duties, and verification steps, protecting the company and ensuring accurate financial reporting.'
            },
            {
                id: 12,
                area: 'Compliance & Controls',
                question: 'What is Segregation of Duties (SOD) and why is it critical?',
                options: [
                    { text: 'Different people handle authorization, execution, and verification to prevent fraud and errors', isCorrect: true },
                    { text: 'All employees should do all tasks independently', isCorrect: false },
                    { text: 'Only managers need to verify work', isCorrect: false },
                    { text: 'Fraud checks are unnecessary', isCorrect: false }
                ],
                explanation: 'SOD prevents a single employee from both committing and concealing unauthorized transactions, reducing fraud risk significantly.'
            },
            {
                id: 13,
                area: 'Continuous Improvement',
                question: 'What is the purpose of Continuous Improvement in finance operations?',
                options: [
                    { text: 'To identify and implement ongoing enhancements to processes, efficiency, quality, and customer satisfaction', isCorrect: true },
                    { text: 'To keep processes exactly the same', isCorrect: false },
                    { text: 'To resist all changes', isCorrect: false },
                    { text: 'To ignore employee suggestions', isCorrect: false }
                ],
                explanation: 'Continuous improvement philosophies like Lean and Six Sigma systematically identify waste, reduce variation, and optimize processes for better outcomes.'
            },
            {
                id: 14,
                area: 'Continuous Improvement',
                question: 'What are common tools for identifying improvement opportunities?',
                options: [
                    { text: 'Process mapping, root cause analysis, data analytics, employee feedback, and benchmarking', isCorrect: true },
                    { text: 'Only management intuition', isCorrect: false },
                    { text: 'Ignoring data and feedback', isCorrect: false },
                    { text: 'Assuming nothing can improve', isCorrect: false }
                ],
                explanation: 'Systematic approaches combine data analysis, team input, and comparison to best practices to identify high-impact improvement opportunities.'
            },
            {
                id: 15,
                area: 'Process Design',
                question: 'What is Business Process Outsourcing (BPO) in finance?',
                options: [
                    { text: 'Contracting external providers to execute specific finance processes to reduce costs or access expertise', isCorrect: true },
                    { text: 'Hiring only internal employees', isCorrect: false },
                    { text: 'Eliminating all processes', isCorrect: false },
                    { text: 'A type of security threat', isCorrect: false }
                ],
                explanation: 'BPO can reduce labor costs and provide specialized expertise (e.g., accounts payable, receivables processing, payroll) while freeing internal staff for strategic work.'
            },
            {
                id: 16,
                area: 'Metrics & Analytics',
                question: 'What is "Benchmarking" in operations?',
                options: [
                    { text: 'Comparing your process performance against peers or industry standards to identify improvement areas', isCorrect: true },
                    { text: 'Assuming your performance is always best', isCorrect: false },
                    { text: 'Ignoring what competitors do', isCorrect: false },
                    { text: 'Never measuring performance', isCorrect: false }
                ],
                explanation: 'Benchmarking provides external context for internal metrics, revealing gaps and inspiring specific improvements to match or exceed peer performance.'
            },
            {
                id: 17,
                area: 'Systems & Technology',
                question: 'What is Robotic Process Automation (RPA) in finance?',
                options: [
                    { text: 'Using software robots to automate repetitive, rule-based finance tasks like invoice processing and data entry', isCorrect: true },
                    { text: 'Replacing all employees with robots', isCorrect: false },
                    { text: 'A type of artificial intelligence only', isCorrect: false },
                    { text: 'Not applicable to finance', isCorrect: false }
                ],
                explanation: 'RPA automates routine tasks (invoice processing, GL reconciliation) without replacing workers, allowing them to focus on analysis and exceptions.'
            },
            {
                id: 18,
                area: 'Team Management',
                question: 'What are key responsibilities of a finance operations manager?',
                options: [
                    { text: 'Process oversight, staff management, quality control, metric tracking, and continuous improvement', isCorrect: true },
                    { text: 'Only processing transactions', isCorrect: false },
                    { text: 'Making all decisions without team input', isCorrect: false },
                    { text: 'Eliminating team development', isCorrect: false }
                ],
                explanation: 'Effective operations managers balance transaction execution, team development, process improvement, and performance management to drive results.'
            }
        ]
    }
};

// Q2O Basics - 21 questions
assessmentQuestions['q2o-basics'] = {
    name: 'Q2O',
    level: 'Basics',
    description: 'Quote-to-Order Fundamentals',
    areas: ['Quote Management', 'Pricing & Configuration', 'Order Entry', 'Approval Workflows', 'Systems & Tools', 'Compliance'],
    questions: [
        { id: 1, area: 'Quote Management', question: 'What is the primary purpose of a sales quote in the Q2O process?', options: [{ text: 'To provide a binding offer to the customer with pricing, terms, and delivery', isCorrect: true }, { text: 'To collect customer contact information', isCorrect: false }, { text: 'To track shipping costs', isCorrect: false }, { text: 'To manage employee assignments', isCorrect: false }], explanation: 'A quote is a formal proposal to the customer with specific pricing, terms, configurations, and delivery timeline. It becomes the basis for the order once accepted.' },
        { id: 2, area: 'Quote Management', question: 'What information should be included in a comprehensive sales quote?', options: [{ text: 'Product/service details, quantities, pricing, discounts, payment terms, and validity period', isCorrect: true }, { text: 'Only the total price', isCorrect: false }, { text: 'Only customer name', isCorrect: false }, { text: 'Competitor pricing', isCorrect: false }], explanation: 'Complete quotes contain all details needed for customer decision-making and order processing: what\'s being offered, how much, when, and on what terms.' },
        { id: 3, area: 'Pricing & Configuration', question: 'What is Configure-Price-Quote (CPQ)?', options: [{ text: 'A system that guides sales through product configuration, applies rules-based pricing, and generates quotes', isCorrect: true }, { text: 'A manual spreadsheet tool', isCorrect: false }, { text: 'Only for large enterprise deals', isCorrect: false }, { text: 'Not relevant to Q2O', isCorrect: false }], explanation: 'CPQ automates quote creation by guiding configuration selections, automatically applying pricing rules, discounts, and generating professional quotes quickly and accurately.' },
        { id: 4, area: 'Pricing & Configuration', question: 'Why is discount governance important in quoting?', options: [{ text: 'To ensure pricing consistency, protect margins, and maintain fairness across customers', isCorrect: true }, { text: 'To eliminate all discounts', isCorrect: false }, { text: 'To allow unlimited discounting', isCorrect: false }, { text: 'For accounting only', isCorrect: false }], explanation: 'Discount controls ensure quotes are competitive yet profitable. Policies define what can be discounted, to whom, and by how much, preventing margin erosion.' },
        { id: 5, area: 'Order Entry', question: 'When should a sales order be created from an accepted quote?', options: [{ text: 'After customer approval and prior to fulfillment to trigger procurement and production', isCorrect: true }, { text: 'Only after payment is received', isCorrect: false }, { text: 'Never – quotes suffice', isCorrect: false }, { text: 'Multiple times for the same quote', isCorrect: false }], explanation: 'Orders convert accepted quotes into operational documents that trigger inventory management, fulfillment, and invoicing processes.' },
        { id: 6, area: 'Order Entry', question: 'What validations should occur when creating an order from a quote?', options: [{ text: 'Credit verification, product availability, pricing confirmation, and delivery feasibility', isCorrect: true }, { text: 'None – proceed immediately', isCorrect: false }, { text: 'Only check customer name', isCorrect: false }, { text: 'Validation is unnecessary', isCorrect: false }], explanation: 'Pre-order validations prevent fulfillment failures: credit holds prevent risky sales, inventory checks enable realistic promises, and pricing validation ensures accuracy.' },
        { id: 7, area: 'Approval Workflows', question: 'When do deals typically require escalation approval in Q2O?', options: [{ text: 'When discounts exceed limits, when deal size is very large, or when special terms are requested', isCorrect: true }, { text: 'Never – all approvals are automatic', isCorrect: false }, { text: 'Only for first-time customers', isCorrect: false }, { text: 'For routine standard deals only', isCorrect: false }], explanation: 'Escalation workflows protect company interests: high discounts require manager approval, large deals need executive visibility, and unusual requests need review.' },
        { id: 8, area: 'Approval Workflows', question: 'What is the purpose of routing quotes through approval hierarchies?', options: [{ text: 'To ensure deals comply with policy, protect margins, and align with business strategy', isCorrect: true }, { text: 'To slow down sales', isCorrect: false }, { text: 'Only for legal compliance', isCorrect: false }, { text: 'Has no real purpose', isCorrect: false }], explanation: 'Approval workflows ensure decision-makers review non-standard deals, maintain controls, prevent unauthorized commitments, and support audit trails.' },
        { id: 9, area: 'Systems & Tools', question: 'What key information flows from Q2O into the O2C process?', options: [{ text: 'Customer details, product specifications, pricing, quantities, and terms from the accepted order', isCorrect: true }, { text: 'Nothing – they\'re completely separate', isCorrect: false }, { text: 'Only the customer name', isCorrect: false }, { text: 'Rejected quotes only', isCorrect: false }], explanation: 'Q2O outputs (accepted orders) become O2C inputs: customer data, product configurations, agreed pricing, and terms flow directly into fulfillment and invoicing.' },
        { id: 10, area: 'Systems & Tools', question: 'How does integration between quoting and order management systems add value?', options: [{ text: 'Eliminates manual re-entry, ensures data consistency, reduces errors, and accelerates order processing', isCorrect: true }, { text: 'Creates more work for users', isCorrect: false }, { text: 'Systems should never integrate', isCorrect: false }, { text: 'Only for large companies', isCorrect: false }], explanation: 'Integrated systems ensure quote-to-order data flows seamlessly: eliminating re-entry errors, maintaining accuracy, and accelerating the sales-to-fulfillment cycle.' },
        { id: 11, area: 'Compliance', question: 'What compliance considerations apply to sales quotes?', options: [{ text: 'Contract terms validity, tax treatment accuracy, regulatory compliance, and customer data protection', isCorrect: true }, { text: 'None – pricing is all that matters', isCorrect: false }, { text: 'Only for government customers', isCorrect: false }, { text: 'Compliance has no role in sales', isCorrect: false }], explanation: 'Quotes are legal offers. Compliance requires accurate terms, correct tax treatment, regulatory adherence (export controls, industry rules), and data privacy protection.' },
        { id: 12, area: 'Compliance', question: 'Why is quote expiration important?', options: [{ text: 'To prevent customers from accepting outdated pricing or terms that no longer reflect business conditions', isCorrect: true }, { text: 'To force customers to buy quickly', isCorrect: false }, { text: 'Has no significance', isCorrect: false }, { text: 'Only for discounted quotes', isCorrect: false }], explanation: 'Quote expiration dates protect the company by limiting liability for stale pricing. Market conditions, costs, and terms change; expired quotes prevent unfavorable order acceptance.' },
        { id: 13, area: 'Quote Management', question: 'What should happen if a customer requests changes to an accepted quote before order creation?', options: [{ text: 'Issue a revised quote, obtain new acceptance, then create order from the updated quote', isCorrect: true }, { text: 'Ignore the request and proceed with the original quote', isCorrect: false }, { text: 'Automatically approve without review', isCorrect: false }, { text: 'Cancel the quote entirely', isCorrect: false }], explanation: 'Quote amendments require a formal revised quote and re-acceptance to ensure agreement on new terms before proceeding with order fulfillment.' },
        { id: 14, area: 'Pricing & Configuration', question: 'How do product bundles affect Q2O pricing?', options: [{ text: 'Bundles combine related products at a single price point, often with discounts, to simplify selling and increase perceived value', isCorrect: true }, { text: 'Bundles increase complexity', isCorrect: false }, { text: 'Bundles are not used in modern sales', isCorrect: false }, { text: 'No impact on pricing', isCorrect: false }], explanation: 'Product bundles streamline selling (fewer SKUs to quote), improve customer value perception, and can simplify pricing administration compared to selling items individually.' },
        { id: 15, area: 'Order Entry', question: 'What is the purpose of a sales order confirmation sent to the customer?', options: [{ text: 'To acknowledge order receipt, confirm product details, pricing, delivery date, and terms so customer can verify accuracy', isCorrect: true }, { text: 'For accounting only', isCorrect: false }, { text: 'Only needed for large orders', isCorrect: false }, { text: 'Is not necessary', isCorrect: false }], explanation: 'Order confirmations serve as customer receipts showing what was ordered, agreed terms, and expected delivery. They reduce disputes and support fulfillment.' },
        { id: 16, area: 'Approval Workflows', question: 'What happens if a sales representative exceeds their approval authority on a quote?', options: [{ text: 'The quote is routed to a higher authority for review and approval before the customer is contacted', isCorrect: true }, { text: 'The representative can override controls', isCorrect: false }, { text: 'The quote is automatically rejected', isCorrect: false }, { text: 'No escalation is needed', isCorrect: false }], explanation: 'Authority limits protect company interests. Exceeding limits triggers escalation to managers or executives who can assess risk and approve or deny the deal.' },
        { id: 17, area: 'Systems & Tools', question: 'What metrics should be tracked for Q2O process effectiveness?', options: [{ text: 'Quote-to-order conversion rate, average sales cycle length, discount trends, and approval cycle time', isCorrect: true }, { text: 'Only revenue', isCorrect: false }, { text: 'Metrics are unnecessary', isCorrect: false }, { text: 'Only employee productivity', isCorrect: false }], explanation: 'Q2O metrics reveal process health: conversion rates show sales effectiveness, cycle times reveal bottlenecks, and discount trending indicates pricing discipline.' },
        { id: 18, area: 'Compliance', question: 'How should multi-currency transactions be handled in the Q2O process?', options: [{ text: 'Apply current exchange rates, document the rate used, include currency in confirmation, and establish payment terms clearly', isCorrect: true }, { text: 'Ignore currency issues', isCorrect: false }, { text: 'Always use USD', isCorrect: false }, { text: 'Not relevant to sales', isCorrect: false }], explanation: 'Multi-currency quotes require clear exchange rate documentation, current rates used at quote time, and payment terms specifying which currency is due.' },
        { id: 19, area: 'Quote Management', question: 'What is a lost quote analysis and why does it matter?', options: [{ text: 'Analyzing why customer rejected your quote to identify pricing gaps, competitive weaknesses, or process improvements', isCorrect: true }, { text: 'Has no value', isCorrect: false }, { text: 'Only important for large deals', isCorrect: false }, { text: 'Should be ignored', isCorrect: false }], explanation: 'Lost quote analysis reveals market feedback: whether price is too high, service offerings are weak, or competitors are stronger, guiding strategy adjustments.' },
        { id: 20, area: 'Pricing & Configuration', question: 'How do volume-based pricing discounts work in the Q2O process?', options: [{ text: 'Unit prices decrease as order volume increases, incentivizing larger purchases while maintaining margin at scale', isCorrect: true }, { text: 'All customers pay the same price', isCorrect: false }, { text: 'Volume doesn\'t affect pricing', isCorrect: false }, { text: 'Only for government customers', isCorrect: false }], explanation: 'Volume discounts reward customer loyalty and large orders while maintaining profitability through economies of scale in production and fulfillment.' },
        { id: 21, area: 'Order Entry', question: 'What should be documented when a customer requests special delivery or installation terms?', options: [{ text: 'Special requirements, delivery dates, installation responsibilities, costs, and applicable fees in the order confirmation', isCorrect: true }, { text: 'Only the delivery address', isCorrect: false }, { text: 'No documentation needed', isCorrect: false }, { text: 'Only internal documentation', isCorrect: false }], explanation: 'Special terms documentation in orders prevents confusion during fulfillment and billing, clarifying responsibilities and costs for non-standard arrangements.' }
    ]
};

// OM Basics - 21 questions
assessmentQuestions['om-basics'] = {
    name: 'Order Management',
    level: 'Basics',
    description: 'Order Management Fundamentals',
    areas: ['Order Processing', 'Inventory Management', 'Fulfillment & Logistics', 'Order Status Tracking', 'Exception Handling', 'Performance Metrics'],
    questions: [
        { id: 1, area: 'Order Processing', question: 'What is the primary purpose of order management in the supply chain?', options: [{ text: 'To coordinate order receipt, fulfillment, shipment, and delivery to meet customer expectations and company profitability', isCorrect: true }, { text: 'Only to process invoices', isCorrect: false }, { text: 'Only to manage inventory', isCorrect: false }, { text: 'Not related to logistics', isCorrect: false }], explanation: 'Order management orchestrates activities from when a customer order is received through final delivery, ensuring customer satisfaction while controlling costs.' },
        { id: 2, area: 'Order Processing', question: 'What validations should occur when an order is received?', options: [{ text: 'Customer validity, inventory availability, shipping address accuracy, and credit status', isCorrect: true }, { text: 'None – process immediately', isCorrect: false }, { text: 'Only check inventory', isCorrect: false }, { text: 'Validation is unnecessary', isCorrect: false }], explanation: 'Pre-processing validations prevent fulfillment failures: credit checks avoid bad debt, inventory verification enables accurate promises, and address validation prevents delivery failures.' },
        { id: 3, area: 'Inventory Management', question: 'How does the Order Management process interact with inventory planning?', options: [{ text: 'Orders drive demand signals that inform inventory levels, purchasing decisions, and replenishment timing', isCorrect: true }, { text: 'No interaction – they\'re separate', isCorrect: false }, { text: 'Only for manufacturing companies', isCorrect: false }, { text: 'Inventory is not affected by orders', isCorrect: false }], explanation: 'Order demand patterns inform inventory strategy: high-volume orders suggest need for higher stock, while low demand signals inventory reduction or discontinuation.' },
        { id: 4, area: 'Inventory Management', question: 'What does "stock-to-order" fulfillment mean versus "made-to-order"?', options: [{ text: 'Stock-to-order ships from existing inventory; made-to-order produces after order received', isCorrect: true }, { text: 'They mean the same thing', isCorrect: false }, { text: 'Not relevant to order management', isCorrect: false }, { text: 'Only for large retailers', isCorrect: false }], explanation: 'Stock-to-order is faster (inventory already available) but requires inventory investment. Made-to-order reduces inventory risk but extends customer lead times.' },
        { id: 5, area: 'Fulfillment & Logistics', question: 'What is a pick-pack-ship workflow in order fulfillment?', options: [{ text: 'Pick products from inventory, pack them securely, and ship to customer address', isCorrect: true }, { text: 'Only applies to e-commerce', isCorrect: false }, { text: 'Not part of order management', isCorrect: false }, { text: 'Only for small orders', isCorrect: false }], explanation: 'Pick-pack-ship is the core fulfillment sequence: locating items, preparing them for shipment, and arranging delivery to the customer.' },
        { id: 6, area: 'Fulfillment & Logistics', question: 'Why is accurate order packing important?', options: [{ text: 'Prevents shipping wrong items, reduces returns, avoids customer dissatisfaction, and minimizes fulfillment costs', isCorrect: true }, { text: 'Packing accuracy doesn\'t matter', isCorrect: false }, { text: 'Only for expensive items', isCorrect: false }, { text: 'Returns are inevitable', isCorrect: false }], explanation: 'Accurate packing ensures customers receive what they ordered, reducing returns and complaints. Errors cost money: return shipping, re-processing, and lost customer trust.' },
        { id: 7, area: 'Order Status Tracking', question: 'What information should customers be able to access regarding their order status?', options: [{ text: 'Order confirmation, fulfillment progress, shipment tracking number, and estimated delivery date', isCorrect: true }, { text: 'Only the order total', isCorrect: false }, { text: 'No visibility needed', isCorrect: false }, { text: 'Only once delivered', isCorrect: false }], explanation: 'Real-time order visibility reduces customer anxiety, decreases support inquiries, and increases satisfaction by showing progress from order to delivery.' },
        { id: 8, area: 'Order Status Tracking', question: 'How does exception management improve order fulfillment?', options: [{ text: 'Identifies problems early (inventory shortfalls, shipping delays) enabling rapid resolution before customer impact', isCorrect: true }, { text: 'Exceptions should be ignored', isCorrect: false }, { text: 'Only matters for large orders', isCorrect: false }, { text: 'Reactive vs proactive doesn\'t matter', isCorrect: false }], explanation: 'Exception management is proactive: flagging stockouts, delays, or quality issues early allows corrective action before customers are negatively affected.' },
        { id: 9, area: 'Exception Handling', question: 'What should happen if a product is out of stock when an order is received?', options: [{ text: 'Notify customer immediately, offer alternatives or backorder with expected ship date', isCorrect: true }, { text: 'Ship whatever is available silently', isCorrect: false }, { text: 'Delay notifying the customer', isCorrect: false }, { text: 'Cancel the order without explanation', isCorrect: false }], explanation: 'Transparent communication about stockouts manages customer expectations. Options include substitutions, backorders with dates, or cancellation – customer choice is important.' },
        { id: 10, area: 'Exception Handling', question: 'How should shipping delays be handled?', options: [{ text: 'Communicate immediately to customer with root cause and revised delivery date', isCorrect: true }, { text: 'Hope the customer doesn\'t notice', isCorrect: false }, { text: 'Only communicate if customer asks', isCorrect: false }, { text: 'Delay notification as long as possible', isCorrect: false }], explanation: 'Proactive communication about delays preserves customer trust. Transparency, explanations, and revised timelines are better than silence and missed expectations.' },
        { id: 11, area: 'Performance Metrics', question: 'What does "On-Time In-Full" (OTIF) measure?', options: [{ text: 'Percentage of orders delivered completely and by the promised date', isCorrect: true }, { text: 'Only delivery date', isCorrect: false }, { text: 'Only order quantity', isCorrect: false }, { text: 'Not a real metric', isCorrect: false }], explanation: 'OTIF is a key supply chain KPI: high OTIF (90%+ is typical target) indicates reliable operations and happy customers. Low OTIF signals operational problems.' },
        { id: 12, area: 'Performance Metrics', question: 'How is Order Cycle Time defined and why does it matter?', options: [{ text: 'Time from order receipt to delivery; lower time improves customer satisfaction and reduces carrying costs', isCorrect: true }, { text: 'Time to process the invoice', isCorrect: false }, { text: 'Total time to pay for an order', isCorrect: false }, { text: 'Not a relevant metric', isCorrect: false }], explanation: 'Short order cycles improve competitiveness, reduce customer inventory carrying costs, and enable faster cash conversion for the company.' },
        { id: 13, area: 'Order Processing', question: 'What information should be captured on an order confirmation?', options: [{ text: 'Products ordered, quantities, prices, delivery address, ship date, and special instructions', isCorrect: true }, { text: 'Only customer name', isCorrect: false }, { text: 'No confirmation needed', isCorrect: false }, { text: 'Only accounting information', isCorrect: false }], explanation: 'Complete confirmations set expectations and provide reference for both fulfillment teams and customer service, reducing confusion and errors.' },
        { id: 14, area: 'Inventory Management', question: 'What is "dead stock" and how does it affect order management?', options: [{ text: 'Inventory that doesn\'t sell; creates carrying costs and cash flow drain, signaling product or demand issues', isCorrect: true }, { text: 'Inventory is always useful', isCorrect: false }, { text: 'Not relevant to order management', isCorrect: false }, { text: 'Only matters for retail', isCorrect: false }], explanation: 'Dead stock ties up capital and warehouse space. Order management systems should flag slow-moving items to enable promotional clearing or discontinuation decisions.' },
        { id: 15, area: 'Fulfillment & Logistics', question: 'What is dropshipping and what are its implications for order management?', options: [{ text: 'Supplier ships directly to customer; order manager coordinates with supplier, ensures quality, and manages risks', isCorrect: true }, { text: 'A fulfillment method with no risks', isCorrect: false }, { text: 'Only for large retailers', isCorrect: false }, { text: 'Not applicable to modern commerce', isCorrect: false }], explanation: 'Dropshipping reduces inventory risk but requires strong supplier relationships, quality oversight, and communication systems to ensure customer satisfaction.' },
        { id: 16, area: 'Exception Handling', question: 'How should customer complaints about wrong items shipped be handled?', options: [{ text: 'Acknowledge immediately, arrange return of wrong items, verify correct items in stock, and expedite shipment', isCorrect: true }, { text: 'Blame the customer', isCorrect: false }, { text: 'Delay response', isCorrect: false }, { text: 'Refuse to take responsibility', isCorrect: false }], explanation: 'Rapid response to fulfillment errors (wrong item, damage, quality issues) preserves customer relationships. Quick resolution with expedited correction is expected.' },
        { id: 17, area: 'Performance Metrics', question: 'What does "Fill Rate" measure in order management?', options: [{ text: 'Percentage of order quantity that can be fulfilled from available inventory without backorder', isCorrect: true }, { text: 'Invoice payment percentage', isCorrect: false }, { text: 'Customer satisfaction percentage', isCorrect: false }, { text: 'Not a key metric', isCorrect: false }], explanation: 'High fill rates (typically 95%+) indicate healthy inventory planning. Low fill rates signal stock issues, demand forecasting problems, or supply chain failures.' },
        { id: 18, area: 'Fulfillment & Logistics', question: 'What are the benefits of using multiple fulfillment centers or locations?', options: [{ text: 'Reduces shipping costs through proximity, improves delivery speed, and provides redundancy', isCorrect: true }, { text: 'More complexity with no benefit', isCorrect: false }, { text: 'Only for very large companies', isCorrect: false }, { text: 'No impact on order management', isCorrect: false }], explanation: 'Distributed fulfillment networks reduce shipping distances and times, lower logistics costs, and protect against single-location disruptions.' },
        { id: 19, area: 'Order Processing', question: 'How should international orders be handled differently than domestic orders?', options: [{ text: 'Include customs forms, export documentation, longer lead times, and customs clearance coordination', isCorrect: true }, { text: 'No difference', isCorrect: false }, { text: 'Only for small orders', isCorrect: false }, { text: 'International orders are not managed', isCorrect: false }], explanation: 'International fulfillment requires additional compliance (export permits, customs forms), longer planning times, and coordination with international carriers.' },
        { id: 20, area: 'Inventory Management', question: 'What is "demand forecasting" and how does it support order management?', options: [{ text: 'Predicting future customer demand to inform inventory levels, purchasing, and production planning', isCorrect: true }, { text: 'Making sales predictions only', isCorrect: false }, { text: 'Not related to order management', isCorrect: false }, { text: 'Only used in manufacturing', isCorrect: false }], explanation: 'Accurate demand forecasts prevent stockouts (lost sales) and excess inventory (carrying costs), optimizing cash flow and customer service levels.' },
        { id: 21, area: 'Exception Handling', question: 'What best practices should be followed for backorder management?', options: [{ text: 'Set realistic delivery dates, maintain customer communication, prioritize fulfillment, and offer alternatives', isCorrect: true }, { text: 'Backorders should be ignored', isCorrect: false }, { text: 'Indefinite backorders are acceptable', isCorrect: false }, { text: 'No communication needed', isCorrect: false }], explanation: 'Effective backorder management maintains customer trust: realistic dates, regular updates, priority fulfillment, and willingness to offer alternatives when appropriate.' }
    ]
};

// ADD MASTERY & STRATEGY VARIANTS (Placeholder structure - same as basics but marked as Mastery/Strategy level)
// These will be created with appropriate difficulty levels

assessmentQuestions['r2r-mastery'] = JSON.parse(JSON.stringify(assessmentQuestions['r2r-basics']));
assessmentQuestions['r2r-mastery'].level = 'Mastery';
assessmentQuestions['r2r-mastery'].description = 'Advanced R2R: KPI ownership, RCA, and process leadership';

assessmentQuestions['r2r-strategy'] = JSON.parse(JSON.stringify(assessmentQuestions['r2r-basics']));
assessmentQuestions['r2r-strategy'].level = 'Strategy';
assessmentQuestions['r2r-strategy'].description = 'R2R Strategy: Operating model design and transformation';

assessmentQuestions['o2c-mastery'] = JSON.parse(JSON.stringify(assessmentQuestions['o2c-basics']));
assessmentQuestions['o2c-mastery'].level = 'Mastery';
assessmentQuestions['o2c-mastery'].description = 'Advanced O2C: DSO optimization, collections strategy, and credit management';

assessmentQuestions['o2c-strategy'] = JSON.parse(JSON.stringify(assessmentQuestions['o2c-basics']));
assessmentQuestions['o2c-strategy'].level = 'Strategy';
assessmentQuestions['o2c-strategy'].description = 'O2C Strategy: Digital transformation and collections automation';

assessmentQuestions['fpa-mastery'] = JSON.parse(JSON.stringify(assessmentQuestions['fpa-basics']));
assessmentQuestions['fpa-mastery'].level = 'Mastery';
assessmentQuestions['fpa-mastery'].description = 'Advanced FP&A: Variance analysis, modeling, and business cases';

assessmentQuestions['fpa-strategy'] = JSON.parse(JSON.stringify(assessmentQuestions['fpa-basics']));
assessmentQuestions['fpa-strategy'].level = 'Strategy';
assessmentQuestions['fpa-strategy'].description = 'FP&A Strategy: Strategic planning and predictive analytics';

assessmentQuestions['ops-mastery'] = JSON.parse(JSON.stringify(assessmentQuestions['ops-basics']));
assessmentQuestions['ops-mastery'].level = 'Mastery';
assessmentQuestions['ops-mastery'].description = 'Advanced Operations: Quality, improvements, and automation';

assessmentQuestions['ops-strategy'] = JSON.parse(JSON.stringify(assessmentQuestions['ops-basics']));
assessmentQuestions['ops-strategy'].level = 'Strategy';
assessmentQuestions['ops-strategy'].description = 'Operations Strategy: GBS model, governance, and transformation';

assessmentQuestions['q2o-mastery'] = JSON.parse(JSON.stringify(assessmentQuestions['q2o-basics']));
assessmentQuestions['q2o-mastery'].level = 'Mastery';
assessmentQuestions['q2o-mastery'].description = 'Advanced Q2O: Complex pricing, deal structure, and accuracy';

assessmentQuestions['q2o-strategy'] = JSON.parse(JSON.stringify(assessmentQuestions['q2o-basics']));
assessmentQuestions['q2o-strategy'].level = 'Strategy';
assessmentQuestions['q2o-strategy'].description = 'Q2O Strategy: Pricing strategy, CPQ systems, and revenue optimization';

assessmentQuestions['om-mastery'] = JSON.parse(JSON.stringify(assessmentQuestions['om-basics']));
assessmentQuestions['om-mastery'].level = 'Mastery';
assessmentQuestions['om-mastery'].description = 'Advanced Order Management: KPIs, exceptions, and cross-functional';

assessmentQuestions['om-strategy'] = JSON.parse(JSON.stringify(assessmentQuestions['om-basics']));
assessmentQuestions['om-strategy'].level = 'Strategy';
assessmentQuestions['om-strategy'].description = 'Order Management Strategy: Network optimization and omnichannel';

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = assessmentQuestions;
}
