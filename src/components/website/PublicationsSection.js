'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Divider, Spin, Row, Col, Button, Tag, Modal, Tooltip, Grid } from 'antd';
import { fetchPublications } from '../../services/sheetApi';
import { FilePdfOutlined, InfoCircleOutlined, FileTextOutlined, BookOutlined, UsergroupAddOutlined, SearchOutlined, ReadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

function getTypeIcon(type) {
  if (!type) return <FileTextOutlined />;
  const typeLC = type.toLowerCase();
  switch (typeLC) {
    case 'journal article': return <ReadOutlined />;
    case 'conference paper': return <UsergroupAddOutlined />;
    case 'book chapter': return <BookOutlined />;
    case 'review': return <SearchOutlined />;
    case 'thesis': return <FileTextOutlined />;
    default: return <FileTextOutlined />;
  }
}

function isInternalPdf(link) {
  return link && !/^https?:\/\//i.test(link);
}

const PublicationsSection = function PublicationsSection({ data = null }) {
  const [publications, setPublications] = useState(data || []);
  const [loading, setLoading] = useState(!data);
  const [modal, setModal] = useState({ open: false, pub: null });
  const [pdfModal, setPdfModal] = useState({ open: false, src: null });
  const router = useRouter();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    if (data) {
      setPublications(data);
      setLoading(false);
      return;
    }
    fetchPublications().then(data => {
      const pubs = (data || [])
        .filter(pub => pub.isshow !== false && pub.isshow !== 'FALSE')
        .sort((a, b) => (b.year || 0) - (a.year || 0));
      setPublications(pubs);
      setLoading(false);
    });
  }, [data]);

  if (loading) return (
    <section className="main-section" id="publications">
      <h2 className="section-title">Our Publications</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {[1, 2].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
            <div style={{ minWidth: 80, textAlign: 'center', height: '100%' }}>
              <div className="skeleton-card" style={{ height: 48, minHeight: 48 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="skeleton-card" style={{ height: 120, minHeight: 120 }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  if (!publications || publications.length === 0) return <div style={{ textAlign: 'center', color: '#ff9800', margin: '32px 0' }}>Không có ấn phẩm khoa học!</div>;

  // Group by year
  const pubsByYear = publications.reduce((acc, pub) => {
    const year = pub.year || 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(pub);
    return acc;
  }, {});


  return (
    <section className="main-section" id="publications">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Divider titlePlacement="left" className="section-title" id="publications" style={{ margin: 0 }}>Công bố khoa học & Ấn phẩm</Divider>
        <Button type="link" onClick={() => router.push('/publications')}>
          Xem tất cả &rarr;
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {Object.entries(pubsByYear).sort(([a], [b]) => b - a).map(([year, pubs]) => (
          <div key={year} style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }} className="year-group">
            {/* Cột trái: Năm - Responsive handle via CSS if needed, currently fixed */}
            <div style={{ minWidth: 80, textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)',
                color: '#fff',
                borderRadius: 12,
                padding: '12px 0',
                boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)',
                fontWeight: 700,
                fontSize: 20
              }}>
                {year}
              </div>
            </div>

            {/* Cột phải: Các publication card */}
            <Row gutter={[24, 24]} align="stretch" style={{ flex: 1 }}>
              {pubs.map((pub, idx) => (
                <Col xs={24} md={12} lg={8} key={pub.id || pub.title || idx} style={{ display: 'flex' }}>
                  <Card
                    className="card-highlight"
                    variant="outlined"
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: 20 } }}
                    hoverable
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: 22, color: '#1677ff' }}>{getTypeIcon(pub.type)}</span>
                      <Tag color="geekblue">{pub.type || 'Article'}</Tag>
                      {pub.citation && <Tag color="green">{pub.citation} quotes</Tag>}
                    </div>
                    <Title level={5} style={{ marginBottom: 8, fontSize: 16, lineHeight: 1.4 }}>
                      {pub.url ? <a href={pub.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{pub.title}</a> : pub.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>{pub.authors}</Text>
                    <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: '#888', fontStyle: 'italic' }}>{pub.journal}</span>
                    </div>

                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      {pub.pdffile && (
                        <Tooltip title="Xem PDF">
                          <Button
                            size="small"
                            type="primary"
                            ghost
                            icon={<FilePdfOutlined />}
                            onClick={() => {
                              if (isInternalPdf(pub.pdffile)) {
                                setPdfModal({ open: true, src: `/pdfs/${pub.pdffile.replace(/^pdfs\//, '')}` });
                              } else {
                                window.open(pub.pdffile, '_blank');
                              }
                            }}
                          >PDF</Button>
                        </Tooltip>
                      )}
                      <Button size="small" icon={<InfoCircleOutlined />} onClick={() => setModal({ open: true, pub })}>Chi tiết</Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
      <Modal
        open={modal.open}
        onCancel={() => setModal({ open: false, pub: null })}
        footer={null}
        title={modal.pub?.title}
        width={isMobile ? '100vw' : 600}
        style={isMobile ? { top: 0, padding: 0, maxWidth: '100vw' } : {}}
        styles={{ body: isMobile ? { padding: 12 } : {} }}
      >
        {modal.pub && (
          <div>
            <Paragraph><b>Tác giả:</b> {modal.pub.authors}</Paragraph>
            <Paragraph><b>Tạp chí/Hội nghị:</b> {modal.pub.journal}</Paragraph>
            {modal.pub.doi && <Paragraph><b>DOI:</b> {modal.pub.doi}</Paragraph>}
            {modal.pub.keywords && <Paragraph><b>Từ khóa:</b> {modal.pub.keywords}</Paragraph>}
            {modal.pub.abstract && <Paragraph><b>Tóm tắt:</b> {modal.pub.abstract}</Paragraph>}
            {modal.pub.details && <Paragraph><b>Chi tiết:</b> {modal.pub.details}</Paragraph>}
            {modal.pub.pdffile && (
              <Button type="primary" icon={<FilePdfOutlined />} href={isInternalPdf(modal.pub.pdffile) ? `/pdfs/${modal.pub.pdffile.replace(/^pdfs\//, '')}` : modal.pub.pdffile} target="_blank" style={{ marginTop: 8 }}>
                Xem PDF
              </Button>
            )}
          </div>
        )}
      </Modal>
      <Modal
        open={pdfModal.open}
        onCancel={() => setPdfModal({ open: false, src: null })}
        footer={null}
        width={isMobile ? '100%' : 900}
        style={isMobile ? { top: 0, left: 0, padding: 0, width: '100%', maxWidth: '100%' } : {}}
        title="Xem PDF"
        styles={{ body: isMobile ? { padding: 0, height: 'auto', width: '100%', overflow: 'hidden' } : { padding: 0, height: 700 } }}
        centered={isMobile}
        closable={true}
        maskClosable={true}
      >
        {pdfModal.src && (
          <iframe
            src={pdfModal.src}
            title="PDF Viewer"
            width="100%"
            height={isMobile ? '80vh' : '700px'}
            style={{ border: 'none', width: '100%', display: 'block', minHeight: isMobile ? '80vh' : 700 }}
            allowFullScreen
          />
        )}
      </Modal>
    </section>
  );
};

export default React.memo(PublicationsSection); 