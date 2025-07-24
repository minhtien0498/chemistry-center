import React, { useEffect, useState } from 'react';
import { Card, Typography, Divider, Spin, Row, Col, Button, Tag, Modal, Tooltip } from 'antd';
import { fetchPublications } from '../services/sheetApi';
import { FilePdfOutlined, InfoCircleOutlined, FileTextOutlined, BookOutlined, UsergroupAddOutlined, SearchOutlined, ReadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

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

export default function PublicationsSection() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, pub: null });
  const [pdfModal, setPdfModal] = useState({ open: false, src: null });

  useEffect(() => {
    fetchPublications().then(data => {
      const pubs = (data || [])
        .filter(pub => pub.isshow !== false && pub.isshow !== 'FALSE')
        .sort((a, b) => (b.year || 0) - (a.year || 0));
      setPublications(pubs);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />;
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
      <Divider orientation="left" id="publications">
        <span style={{ fontSize: 32, fontWeight: 700, color: '#1677ff' }}>Our Publications</span>
      </Divider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {Object.entries(pubsByYear).sort(([a], [b]) => b - a).map(([year, pubs]) => (
          <div key={year} style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
            {/* Cột trái: Năm */}
            <div style={{ minWidth: 80, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Title level={3} style={{ color: '#1677ff', margin: 0 }}>{year}</Title>
            </div>
            {/* Cột phải: Các publication card */}
            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {pubs.map((pub, idx) => (
                <div key={pub.id || pub.title || idx} style={{ flex: '1 1 320px', maxWidth: 370, minWidth: 260 }}>
                  <Card
                    style={{
                      borderRadius: 16,
                      boxShadow: '0 4px 24px 0 rgba(22,119,255,0.08)',
                      textAlign: 'left',
                      minHeight: 220,
                      background: '#fff',
                      border: '1.5px solid #e6f4ff',
                      padding: 18
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={modal.open}
        onCancel={() => setModal({ open: false, pub: null })}
        footer={null}
        title={modal.pub?.title}
        width={600}
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
        width={900}
        title="Xem PDF"
        bodyStyle={{ padding: 0, height: 700 }}
      >
        {pdfModal.src && (
          <iframe
            src={pdfModal.src}
            title="PDF Viewer"
            width="100%"
            height="700px"
            style={{ border: 'none' }}
          />
        )}
      </Modal>
    </div>
  );
} 