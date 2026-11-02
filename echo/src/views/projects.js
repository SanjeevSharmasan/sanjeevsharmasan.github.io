import { getState, createProject, updateProject, deleteProject, sessionsByProject, createSession, updateSession, deleteSession } from '../store.js';
import { icon, esc, timeAgo, clockMs, toast, promptDialog, confirmDialog, openMenu, download, safeFileName } from '../ui.js';
import { exportSession, toMarkdown } from '../export.js';
import { langName } from '../languages.js';

const COLORS = ['#6d5efc', '#0f9f8f', '#d97706', '#db2777', '#2f4cf6', '#2b9a66'];

export class ProjectsView {
  constructor(ctx) { this.ctx = ctx; }

  mount(container, params = {}) {
    this.container = container;
    this.projectId = params.id || null;
    this.paint();
  }

  destroy() {}

  paint() {
    const st = getState();
    if (this.projectId && this.projectId !== 'inbox' && !st.projects.find(p => p.id === this.projectId)) this.projectId = null;
    this.container.innerHTML = this.projectId ? this.detailHtml() : this.gridHtml();
    this.container.querySelector('.page')?.addEventListener('click', this.onClick);
  }

  get counts() {
    const map = new Map();
    getState().sessions.forEach(s => {
      const k = s.projectId || '';
      map.set(k, (map.get(k) || 0) + 1);
    });
    return map;
  }

  gridHtml() {
    const st = getState();
    const counts = this.counts;
    const inbox = counts.get('') || 0;

    return `
      <div class="page">
        <header class="page-head">
          <div><h1 class="page-title">Projects</h1>
          <div class="page-sub">Group recordings by client, meeting or topic</div></div>
          <div class="spacer"></div>
          <button class="btn btn-primary" data-act="new-project">${icon('plus', 15)} New project</button>
        </header>
        <div class="page-scroll">
          <div class="grid-cards">
            <button class="proj-card" data-act="inbox" style="border-style:dashed">
              <span class="proj-icon" style="background:var(--panel-3);color:var(--text-2)">${icon('archive', 16)}</span>
              <span class="proj-name">Unfiled</span>
              <span class="proj-meta">${inbox} transcript${inbox === 1 ? '' : 's'} without a project</span>
              <span class="proj-foot"><span>Everything else</span>${icon('arrowRight', 13)}</span>
            </button>

            ${st.projects.map(p => {
              const n = counts.get(p.id) || 0;
              const last = st.sessions.filter(s => s.projectId === p.id).sort((a, b) => b.updatedAt - a.updatedAt)[0];
              return `<div class="proj-card" data-open="${p.id}">
                <span class="proj-icon" style="background:${p.color}">${icon('folder', 16)}</span>
                <span class="proj-name">${esc(p.name)}</span>
                <span class="proj-meta">${n} transcript${n === 1 ? '' : 's'}${last ? ` · updated ${timeAgo(last.updatedAt)}` : ''}</span>
                <span class="proj-foot"><span>Created ${new Date(p.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  <button class="icon-btn sm" data-menu="${p.id}" title="Project options">${icon('more', 15)}</button>
                </span>
              </div>`;
            }).join('')}

            <button class="proj-card proj-new" data-act="new-project">
              ${icon('plus', 20)}
              <span style="font-size:12.5px;font-weight:550">Create a project</span>
            </button>
          </div>

          ${st.projects.length === 0 ? `<div style="text-align:center;color:var(--muted);font-size:12.5px;padding:0 24px 40px">
            Projects keep long recordings organised. Everything you record lives in <b>Unfiled</b> until you move it.
          </div>` : ''}
        </div>
      </div>`;
  }

  detailHtml() {
    const st = getState();
    const isInbox = this.projectId === 'inbox';
    const p = isInbox
      ? { id: null, name: 'Unfiled', color: '#8b8b82' }
      : st.projects.find(x => x.id === this.projectId);
    if (!p) return this.gridHtml();
    const sessions = sessionsByProject(p.id);

    return `
      <div class="page">
        <header class="page-head">
          <button class="icon-btn" data-act="back" title="All projects">${icon('chevronLeft', 18)}</button>
          <span class="proj-icon" style="background:${p.color};width:26px;height:26px;border-radius:7px">${icon(isInbox ? 'archive' : 'folder', 14)}</span>
          <div>
            <h1 class="page-title">${esc(p.name)}</h1>
            <div class="page-sub">${sessions.length} transcript${sessions.length === 1 ? '' : 's'}</div>
          </div>
          <div class="spacer"></div>
          ${isInbox ? '' : `<button class="btn" data-act="rename">${icon('edit', 14)} Rename</button>`}
          <button class="btn" data-act="export-project">${icon('download', 14)} Export all</button>
          <button class="btn btn-primary" data-act="record-here">${icon('mic', 15)} Record</button>
        </header>
        <div class="page-scroll" style="padding:20px 22px">
          ${sessions.length ? `<div class="card">${sessions.map(s => `
            <button class="row" data-session="${s.id}" style="width:100%;text-align:left;cursor:pointer">
              <span class="proj-icon" style="background:var(--panel-3);color:var(--text-2);width:30px;height:30px;border-radius:8px">${icon('quote', 14)}</span>
              <span class="row-text">
                <span class="row-title" style="display:block">${esc(s.title)}</span>
                <span class="row-desc">${timeAgo(s.updatedAt)} · ${clockMs(s.durationMs || 0)} · ${(s.segments?.length || 0)} ${(s.segments?.length || 0) === 1 ? 'line' : 'lines'} · ${esc(langName(s.language))}</span>
              </span>
              ${icon('chevronRight', 15)}
            </button>`).join('')}</div>`
          : `<div class="transcript-empty" style="margin-top:10vh">
              <div class="empty-art">${icon('mic', 30)}</div>
              <h2 class="empty-title">Nothing here yet</h2>
              <p class="empty-text">Record something in this project, or move an existing transcript here from Smart Scribe → More → Move to project.</p>
              <div class="empty-actions">
                <button class="btn btn-primary" data-act="record-here">${icon('mic', 15)} Record</button>
                <button class="btn" data-act="back">Browse projects</button>
              </div>
            </div>`}
        </div>
      </div>`;
  }

  onClick = async (e) => {
    const menuBtn = e.target.closest('[data-menu]');
    if (menuBtn) {
      e.stopPropagation();
      this.projectMenu(menuBtn, menuBtn.dataset.menu);
      return;
    }
    const open = e.target.closest('[data-open]');
    if (open) { this.ctx.navigate(`#/projects/${open.dataset.open}`); return; }

    const row = e.target.closest('[data-session]');
    if (row) { this.ctx.navigate(`#/scribe/${row.dataset.session}`); return; }

    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) return;

    if (act === 'new-project') await this.createNew();
    if (act === 'inbox') this.ctx.navigate('#/projects/inbox');
    if (act === 'back') this.ctx.navigate('#/projects');
    if (act === 'rename') await this.rename();
    if (act === 'export-project') await this.exportProject();
    if (act === 'record-here') {
      const s = createSession({ projectId: this.projectId === 'inbox' ? null : this.projectId, title: 'Untitled recording' });
      this.ctx.navigate(`#/scribe/${s.id}`);
    }
  };

  async createNew() {
    const name = await promptDialog({ title: 'New project', label: 'Project name', placeholder: 'e.g. Acme renewal call' });
    if (!name) return;
    const color = COLORS[getState().projects.length % COLORS.length];
    const p = createProject(name, color);
    this.ctx.refreshShell?.();
    this.ctx.navigate(`#/projects/${p.id}`);
  }

  async rename() {
    const p = getState().projects.find(x => x.id === this.projectId);
    if (!p) return;
    const name = await promptDialog({ title: 'Rename project', label: 'Project name', value: p.name });
    if (!name) return;
    updateProject(p.id, { name });
    this.paint();
  }

  projectMenu(anchor, id) {
    const p = getState().projects.find(x => x.id === id);
    if (!p) return;
    openMenu(anchor, [
      { id: 'open', label: 'Open project', icon: 'folder', onClick: () => this.ctx.navigate(`#/projects/${id}`) },
      { id: 'rename', label: 'Rename', icon: 'edit', onClick: async () => {
        const name = await promptDialog({ title: 'Rename project', label: 'Name', value: p.name });
        if (name) { updateProject(id, { name }); this.paint(); }
      } },
      { id: 'color', label: 'Change colour', icon: 'sparkles', onClick: () => {
        const idx = COLORS.indexOf(p.color);
        updateProject(id, { color: COLORS[(idx + 1) % COLORS.length] });
        this.paint();
      } },
      { sep: true },
      { id: 'del', label: 'Delete project', icon: 'trash', danger: true, onClick: async () => {
        const ok = await confirmDialog({
          title: 'Delete project?',
          message: `“${p.name}” will be deleted. Its transcripts are kept and moved to Unfiled.`,
          confirmLabel: 'Delete project',
          danger: true
        });
        if (ok) { deleteProject(id, { keepSessions: true }); this.paint(); this.ctx.refreshShell?.(); }
      } }
    ]);
  }

  async exportProject() {
    const p = this.projectId === 'inbox'
      ? { name: 'Unfiled' }
      : getState().projects.find(x => x.id === this.projectId);
    const sessions = sessionsByProject(this.projectId === 'inbox' ? null : this.projectId).filter(s => s.segments?.length);
    if (!sessions.length) { toast('No transcripts to export', { iconName: 'info' }); return; }
    const md = sessions.map(s => toMarkdown(s)).join('\n\n---\n\n');
    download(safeFileName(p?.name || 'project', 'md'), md, 'text/markdown');
    toast(`Exported ${sessions.length} ${sessions.length === 1 ? 'transcript' : 'transcripts'}`);
  }
}
