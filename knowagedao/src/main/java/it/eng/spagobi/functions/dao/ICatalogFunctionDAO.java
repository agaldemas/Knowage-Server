package it.eng.spagobi.functions.dao;

import java.util.List;
import java.util.Map;

import it.eng.spago.error.EMFUserError;
import it.eng.spagobi.commons.dao.ISpagoBIDao;
import it.eng.spagobi.functions.metadata.SbiCatalogFunction;
import it.eng.spagobi.utilities.CatalogFunction;

public interface ICatalogFunctionDAO extends ISpagoBIDao {

	public int insertCatalogFunction(CatalogFunction catalogFunction, Map<String, String> inputColumns, Map<String, String> inputVariables,
			Map<String, String> outputColumns) throws EMFUserError;

	public List<SbiCatalogFunction> loadAllCatalogFunctions();

	public int updateCatalogFunction(CatalogFunction updatedCatalogFunction, int id);

	public void deleteCatalogFunction(int id);

	public SbiCatalogFunction getCatalogFunctionById(int id);

	public SbiCatalogFunction getCatalogFunctionByLabel(String label);

}