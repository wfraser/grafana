import React, { FC } from 'react';
import { AlertBox } from '../../core/components/AlertBox/AlertBox';
import { AppNotificationSeverity, LdapConnectionInfo, LdapServerInfo } from 'app/types';

interface Props {
  ldapConnectionInfo: LdapConnectionInfo;
  headingStyle: string;
  tableStyle: string;
}

export const LdapConnectionStatus: FC<Props> = ({ ldapConnectionInfo, headingStyle, tableStyle }) => {
  return (
    <>
      <h4 className={headingStyle}>LDAP Connection</h4>
      <div className={tableStyle}>
        <table className="filter-table form-inline">
          <thead>
            <tr>
              <th>Host</th>
              <th colSpan={2}>Port</th>
            </tr>
          </thead>
          <tbody>
            {ldapConnectionInfo &&
              ldapConnectionInfo.map((serverInfo, index) => (
                <tr key={index}>
                  <td>{serverInfo.host}</td>
                  <td>{serverInfo.port}</td>
                  <td>
                    {serverInfo.available ? (
                      <i className="fa fa-fw fa-check pull-right" />
                    ) : (
                      <i className="fa fa-fw fa-exclamation-triangle pull-right" />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <LdapErrorBox ldapConnectionInfo={ldapConnectionInfo} />
      </div>
    </>
  );
};

interface LdapConnectionErrorProps {
  ldapConnectionInfo: LdapConnectionInfo;
}

export const LdapErrorBox: FC<LdapConnectionErrorProps> = ({ ldapConnectionInfo }) => {
  const hasError = ldapConnectionInfo.some(info => info.error);
  if (!hasError) {
    return null;
  }

  const connectionErrors: LdapServerInfo[] = [];
  ldapConnectionInfo.forEach(info => {
    if (info.error) {
      connectionErrors.push(info);
    }
  });

  const errorElements = connectionErrors.map((info, index) => (
    <div key={index}>
      <span style={{ fontWeight: 500 }}>
        {info.host}:{info.port}
        <br />
      </span>
      <span>{info.error}</span>
      {index !== connectionErrors.length - 1 && (
        <>
          <br />
          <br />
        </>
      )}
    </div>
  ));

  return (
    <AlertBox title="Connection error" iconOnTop={true} severity={AppNotificationSeverity.Error} body={errorElements} />
  );
};