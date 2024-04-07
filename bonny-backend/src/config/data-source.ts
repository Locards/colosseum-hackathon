import { DataSource } from 'typeorm';
import databaseConfig from './database-config';
import {
  AuthTypes,
  Connector,
  IpAddressTypes,
} from '@google-cloud/cloud-sql-connector';

export const AppDataSource = (async () => {
  if (process.env.DB_IN_GCLOUD == 'true') {
    const clientOpts = await new Connector().getOptions({
      instanceConnectionName: 'locards-bonny-test:europe-west3:bonny-test-db',
      ipType: IpAddressTypes.PUBLIC,
      authType: AuthTypes.PASSWORD,
    });

    const dataSource = new DataSource({
      ...databaseConfig,
      extra: {
        ...clientOpts,
      },
    });
    return dataSource;
  } else {
    const dataSource = new DataSource(databaseConfig);
    return dataSource;
  }
})();
