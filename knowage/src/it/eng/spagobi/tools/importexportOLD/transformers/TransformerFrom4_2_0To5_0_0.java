/* SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package it.eng.spagobi.tools.importexportOLD.transformers;

import it.eng.spagobi.commons.utilities.GeneralUtilities;
import it.eng.spagobi.tools.importexportOLD.ITransformer;

import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

public class TransformerFrom4_2_0To5_0_0 implements ITransformer {

	static private Logger logger = Logger.getLogger(TransformerFrom4_2_0To5_0_0.class);

	public byte[] transform(byte[] content, String pathImpTmpFolder, String archiveName) {
		logger.debug("IN");
		try {
			TransformersUtilities.decompressArchive(pathImpTmpFolder, archiveName, content);
		} catch(Exception e) {
			logger.error("Error while unzipping exported archive", e);	
		}
		archiveName = archiveName.substring(0, archiveName.lastIndexOf('.'));
		changeDatabase(pathImpTmpFolder, archiveName);
		// compress archive
		try {
			content = TransformersUtilities.createExportArchive(pathImpTmpFolder, archiveName);
		} catch (Exception e) {
			logger.error("Error while creating creating the export archive", e);	
		}
		// delete tmp dir content
		File tmpDir = new File(pathImpTmpFolder);
		GeneralUtilities.deleteContentDir(tmpDir);
		logger.debug("OUT");
		return content;
	}


	private void changeDatabase(String pathImpTmpFolder, String archiveName) {
		logger.debug("IN");
		Connection conn = null;
		try {
			conn = TransformersUtilities.getConnectionToDatabase(pathImpTmpFolder, archiveName);
			fixSbiObjects(conn);
			fixSbiObjPar(conn);

		} catch (Exception e) {
			logger.error("Error while changing database", e);	
		} finally {
			logger.debug("OUT");
			try {
				if (conn != null && !conn.isClosed()) {
					conn.close();
				}
			} catch (SQLException e) {
				logger.error("Error closing connection to export database", e);
			}
		}
	}
	
	
	private void fixSbiObjects(Connection conn) throws Exception {
		logger.debug("IN");
		Statement stmt = conn.createStatement();
		String sql = "";
		try {
			
			sql = "ALTER TABLE SBI_OBJECTS ADD COLUMN PARAMETERS_REGION VARCHAR(20);";
			stmt.executeUpdate(sql);
		
		} catch (Exception e) {
			logger.error(
					"Error in altering SBI_OBJECTS",
					e);
		}
		
		logger.debug("OUT");
		
	}
	
	private void fixSbiObjPar(Connection conn) throws Exception {
		logger.debug("IN");
		Statement stmt = conn.createStatement();
		String sql = "";
		try {
			
			sql = "ALTER TABLE SBI_OBJ_PAR ADD COLUMN COL_SPAN INTEGER;";
			stmt.executeUpdate(sql);

			sql = "ALTER TABLE SBI_OBJ_PAR ADD COLUMN THICK_PERC INTEGER;";
			stmt.executeUpdate(sql);
			
		} catch (Exception e) {
			logger.error(
					"Error in altering SBI_OBJ_PAR",
					e);
		}
		
		logger.debug("OUT");
		
	}

}

