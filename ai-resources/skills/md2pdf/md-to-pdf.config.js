// Shared configuration for md-to-pdf in this workspace.
// Provides a footer with a left-aligned generation timestamp
// and right-aligned "Page X of Y", plus extra bottom margin.

const path = require('node:path');
const generatedAt = new Date().toLocaleString();
const inputFilename = path.basename(process.argv[process.argv.length - 1]);

module.exports = {
  stylesheet_encoding: 'utf-8',
  css: `
    blockquote {
      font-family: CommitMono, "Andale Mono", Menlo, Monaco, "SF Mono", "Courier New", ui-monospace, monospace;
      font-style: normal;
      background-color: #f6f8fa;
    }
  `,
  pdf_options: {
    // Top/right/bottom/left margins. Increase bottom so the footer
    // does not overlap the page content.
    margin: '20mm 20mm 30mm 20mm',
    printBackground: true,
    footerTemplate: `
      <style>
        .pdf-footer {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 9px;
          width: 100%;
          position: relative;
        }
        .pdf-footer-left {
          position: absolute;
          left: 10mm;
        }
        .pdf-footer-centre {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
        }
        .pdf-footer-right {
          position: absolute;
          right: 10mm;
          text-align: right;
        }
      </style>
      <section class="pdf-footer">
        <div class="pdf-footer-left">
          Generated: ${generatedAt}
        </div>
        <div class="pdf-footer-centre">
          ${inputFilename}
        </div>
        <div class="pdf-footer-right">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      </section>
    `,
  },
};
