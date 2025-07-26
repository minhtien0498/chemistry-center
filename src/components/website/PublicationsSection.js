import React, { useEffect, useState } from 'react';
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

const PublicationsSection = function PublicationsSection() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, pub: null });
  const [pdfModal, setPdfModal] = useState({ open: false, src: null });
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    fetchPublications().then(data => {
      const pubs = (data || [])
        .filter(pub => pub.isshow !== false && pub.isshow !== 'FALSE')
        .sort((a, b) => (b.year || 0) - (a.year || 0));
      setPublications(pubs);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <section className="main-section" id="publications">
      <h2 className="section-title">Our Publications</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {[1,2].map(i => (
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
  if (!publications || publications.length === 0) return <div style={{textAlign:'center',color:'#ff9800',margin:'32px 0'}}>Không có ấn phẩm khoa học!</div>;

  // Group by year
  const pubsByYear = publications.reduce((acc, pub) => {
    const year = pub.year || 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(pub);
    return acc;
  }, {});

  return (
    <div style={{ margin: '32px 0' }}>
      <Divider orientation="left" className="section-title" id="publications">Our Publications</Divider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {Object.entries(pubsByYear).sort(([a], [b]) => b - a).map(([year, pubs]) => (
          <div key={year} style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
            {/* Cột trái: Năm */}
            <div style={{ minWidth: 80, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Title level={3} style={{ color: '#1677ff', margin: 0 }}>{year}</Title>
            </div>
            {/* Cột phải: Các publication card */}
            <Row gutter={[24, 24]} align="stretch" style={{ flex: 1 }}>
              {pubs.map((pub, idx) => (
                <Col xs={24} sm={12} md={8} key={pub.id || pub.title || idx} style={{ display: 'flex' }}>
                  <Card
                    style={{
                      borderRadius: 16,
                      boxShadow: '0 4px 24px 0 rgba(22,119,255,0.08)',
                      textAlign: 'left',
                      minHeight: 220,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: '#fff',
                      border: '1.5px solid #e6f4ff',
                      padding: 18,
                      flex: 1
                    }}
                    hoverable
                  >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{ fontSize: 22 }}>{getTypeIcon(pub.type)}</span>
                        <Text strong>{pub.type || 'Article'}</Text>
                        {pub.citation && <Tag color="green">{pub.citation} citations</Tag>}
                      </div>
                      <Title level={5} style={{ marginBottom: 4 }}>
                        {pub.url ? <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.title}</a> : pub.title}
                      </Title>
                      <Text type="secondary" style={{ fontSize: 15 }}>{pub.authors}</Text>
                      <Paragraph style={{ margin: '8px 0 0 0', fontSize: 14 }}>{pub.journal}</Paragraph>
                      {pub.doi && <Paragraph style={{ margin: 0, fontSize: 13, color: '#888' }}>DOI: {pub.doi}</Paragraph>}
                      <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {pub.pdffile && (
                          <Tooltip title="Xem PDF">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<FilePdfOutlined />}
                              onClick={() => {
                                if (isInternalPdf(pub.pdffile)) {
                                  setPdfModal({ open: true, src: `/pdfs/${pub.pdffile.replace(/^pdfs\//, '')}` });
                                } else {
                                  window.open(pub.pdffile, '_blank');
                                }
                              }}
                            />
                          </Tooltip>
                        )}
                        <Tooltip title="Chi tiết">
                          <Button type="default" shape="circle" icon={<InfoCircleOutlined />} onClick={() => setModal({ open: true, pub })} />
                        </Tooltip>
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
        bodyStyle={isMobile ? { padding: 12 } : {}}
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
        bodyStyle={isMobile ? { padding: 0, height: 'auto', width: '100%', overflow: 'hidden' } : { padding: 0, height: 700 }}
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
    </div>
  );
};

export default React.memo(PublicationsSection); 