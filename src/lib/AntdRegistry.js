'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { useServerInsertedHTML } from 'next/navigation';

const StyledComponentsRegistry = ({ children }) => {
    const cache = React.useMemo(() => createCache(), []);
    useServerInsertedHTML(() => (
        <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
    ));
    return (
        <StyleProvider cache={cache}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1677ff',
                        colorInfo: '#1677ff',
                        colorSuccess: '#52c41a',
                        colorWarning: '#faad14',
                        colorError: '#ff4d4f',
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        borderRadius: 8,
                        wireframe: false,
                    },
                    components: {
                        Button: {
                            controlHeight: 40,
                            borderRadius: 8,
                            paddingContentHorizontal: 20,
                            fontWeight: 500,
                        },
                        Card: {
                            borderRadiusLG: 16,
                            boxShadowTertiary: '0 4px 12px rgba(0,0,0,0.05)',
                        },
                        Typography: {
                            fontFamilyCode: 'Menlo, Monaco, Consolas, "Courier New", monospace',
                        }
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </StyleProvider>
    );
};

export default StyledComponentsRegistry;
