import { useEffect, useState } from 'react'
import { getWebhooks } from './services/api'
import './App.css'

function App() {
  const [webhooks, setWebhooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch webhooks when the dashboard loads
  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        const data = await getWebhooks()
        setWebhooks(data.webhooks)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWebhooks()
  }, [])

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">H</div>
          <span>HookLens</span>
          <span className="brand-lite">LITE</span>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">WORKSPACE</p>

          <button className="nav-item active">
            <span>◫</span>
            Webhooks
          </button>

          <button className="nav-item">
            <span>◷</span>
            Events
          </button>
        </div>

        <div className="sidebar-bottom">
          <div className="user-profile">
            <div className="user-avatar">V</div>
            <div>
              <p className="user-name">My Workspace</p>
              <p className="user-plan">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> Webhooks
          </div>

          <div className="topbar-right">
            <span className="status-dot"></span>
            <span className="connection-status">Local environment</span>
            <div className="top-avatar">V</div>
          </div>
        </header>

        <section className="page-heading">
          <div>
            <h1>Webhooks</h1>
            <p>Manage your endpoints and inspect incoming requests.</p>
          </div>
        </section>

        {/* Webhook Summary */}
        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Webhooks</p>
            <h2>{loading ? '—' : webhooks.length}</h2>
            <span>Created endpoints</span>
          </div>

          <div className="stat-card">
            <p>Total Events</p>
            <h2>—</h2>
            <span>Coming soon</span>
          </div>

          <div className="stat-card">
            <p>Active Endpoints</p>
            <h2>{loading ? '—' : webhooks.length}</h2>
            <span>Available endpoints</span>
          </div>
        </section>

        {/* Webhook List */}
        <section className="webhooks-section">
          <div className="section-header">
            <div>
              <h2>Your Webhooks</h2>
              <p>All your registered webhook endpoints.</p>
            </div>

            <button className="create-button" disabled>
              + Create Webhook
            </button>
          </div>

          {loading && (
            <p className="feedback-message">Loading webhooks...</p>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          {!loading && !error && webhooks.length === 0 && (
            <p className="feedback-message">
              No webhooks yet. Create your first webhook to get started.
            </p>
          )}

          {!loading && !error && webhooks.length > 0 && (
            <div className="webhook-list">
              {webhooks.map((webhook) => (
                <div className="webhook-row" key={webhook.id}>
                  <div className="webhook-info">
                    <div className="webhook-icon">↗</div>

                    <div>
                      <h3>{webhook.name}</h3>
                      <p>{`/webhooks/${webhook.id}`}</p>
                    </div>
                  </div>

                  <div className="webhook-meta">
                    <span className="endpoint-status">● Active</span>
                    <span>
                      {new Date(
                        webhook.created_at.replace(' ', 'T') + 'Z'
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  )
}

export default App