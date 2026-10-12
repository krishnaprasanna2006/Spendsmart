
import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Salary", amount: 25000, type: "Income", category: "Work" },
    { id: 2, title: "Groceries", amount: 1500, type: "Expense", category: "Food" },
    { id: 3, title: "Bus Pass", amount: 800, type: "Expense", category: "Travel" },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  function addTransaction(e) {
    e.preventDefault();
    if (!title.trim() || Number(amount) <= 0) return;

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        title: title.trim(),
        amount: Number(amount),
        type,
        category,
      },
    ]);

    setTitle("");
    setAmount("");
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>💰 SpendSmart</h2>
        <p className="nav-active">▦ Dashboard</p>
        <p>↔ Transactions</p>
        <p>📊 Analytics</p>
        <p>⚙ Settings</p>
      </aside>

      <main className="main">
        <header>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your financial overview.</p>
          </div>
          <span className="profile">My Account 👤</span>
        </header>

        <section className="summary">
          <div className="summary-card balance">
            <p>Total Balance</p>
            <h2>{money(balance)}</h2>
            <span>Income minus expenses</span>
          </div>

          <div className="summary-card">
            <p>Total Income</p>
            <h2>{money(income)}</h2>
            <span>Money received</span>
          </div>

          <div className="summary-card">
            <p>Total Expenses</p>
            <h2>{money(expenses)}</h2>
            <span>Money spent</span>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h2>Add Transaction</h2>
            <form onSubmit={addTransaction}>
              <label>Transaction name</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Shopping"
                required
              />

              <label>Amount (₹)</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />

              <label>Transaction type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option>Expense</option>
                <option>Income</option>
              </select>

              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Work</option>
                <option>Other</option>
              </select>

              <button type="submit">+ Add Transaction</button>
            </form>
          </div>

          <div className="panel">
            <h2>Recent Transactions</h2>
            {transactions.length === 0 ? (
              <p>No transactions yet. Add one to get started!</p>
            ) : (
              <div className="transactions">
                {transactions.map((t) => (
                  <div className="transaction" key={t.id}>
                    <div>
                      <strong>{t.title}</strong>
                      <p>{t.category} · {t.type}</p>
                    </div>
                    <div className="transaction-right">
                      <strong className={t.type === "Income" ? "positive" : "negative"}>
                        {t.type === "Income" ? "+" : "-"}
                        {money(t.amount)}
                      </strong>
                      <button
                        className="delete"
                        onClick={() => deleteTransaction(t.id)}
                        aria-label={`Delete ${t.title}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer>SpendSmart © 2026 · Manage your money wisely.</footer>
      </main>
    </div>
  );
}

export default App;
